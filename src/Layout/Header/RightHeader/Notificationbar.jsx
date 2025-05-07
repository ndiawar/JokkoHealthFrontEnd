import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useNotifications from '../../../Hooks/useNotifications';
import NotificationService from '../../../Services/notificationService';
import SvgIcon from '../../../Components/Common/Component/SvgIcon';
import { CHECKALL, Notification } from '../../../Constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faCalendar, faHeartbeat, faExclamationTriangle, faBell, faList } from '@fortawesome/free-solid-svg-icons';
import './Notificationbar.css';

const Notificationbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const audioRef = useRef(new Audio('/sounds/notification.mp3'));
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    loadNotifications
  } = useNotifications();

  // Récupérer le layout courant depuis l'URL
  const layout = location.pathname.split('/').pop();

  // Récupérer le rôle utilisateur depuis le localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}
  const userRole = user && user.role ? user.role : null;

  // Initialiser la connexion WebSocket et gérer les nouvelles notifications
  useEffect(() => {
    NotificationService.initializeSocket();
    const removeListener = NotificationService.addNotificationListener((newNotification) => {
      loadNotifications();
      // Jouer le son de notification
      if (newNotification && !newNotification.isRead) {
        audioRef.current.play().catch(error => {
          console.log('Erreur lors de la lecture du son:', error);
        });
      }
    });
    return () => {
      removeListener();
    };
  }, [loadNotifications]);

  // Handler pour ouvrir le dropdown et marquer toutes les notifications comme lues
  const handleDropdownOpen = () => {
    setNotificationDropDown(true);
    if (unreadCount > 0) {
      markAllAsRead();
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    setNotificationDropDown(false);
    if (userRole === 'SuperAdmin') {
      navigate(`/notifications/${layout}`);
      return;
    }
    if (notification.data) {
      switch (notification.type) {
        case 'appointment':
          if (userRole === 'Medecin') {
            navigate(`/pages/medcin/rendezvous/${layout}`);
          } else {
            navigate(`/pages/rendezvous/${layout}`);
          }
          break;
        case 'sensor':
          navigate(`/pages/sensors/${notification.data.sensorId}`);
          break;
        case 'emergency':
          navigate(`/pages/emergency/${notification.data.emergencyId}`);
          break;
        case 'medical':
          navigate(`/pages/dossiermedical/${notification.data.recordId}`);
          break;
        default:
          navigate(`/notifications/${layout}`);
          break;
      }
    } else {
      navigate(`/notifications/${layout}`);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return faCalendar;
      case 'sensor':
        return faHeartbeat;
      case 'emergency':
        return faExclamationTriangle;
      default:
        return faBell;
    }
  };

  const renderNotificationContent = (notification) => (
    <div className="notification-content">
      <div className="notification-icon">
        <FontAwesomeIcon icon={getNotificationIcon(notification.type)} />
      </div>
      <div className="notification-details">
        <p className="notification-title">{notification.title}</p>
        <p className="notification-message">{notification.message}</p>
        <span className="notification-time">
          {NotificationService.formatNotificationDate(notification.createdAt)}
        </span>
      </div>
      <div className="notification-actions">
        {!notification.isRead && (
          <button
            className="mark-read-btn"
            onClick={(e) => {
              e.stopPropagation();
              markAsRead(notification._id);
            }}
            title="Marquer comme lu"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteNotification(notification._id);
          }}
          title="Supprimer"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );

  // Filtrer les notifications non lues pour le dropdown
  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <li className='onhover-dropdown'>
      <div className='notification-box' onClick={handleDropdownOpen}>
        <SvgIcon iconId='notification' />
        {unreadCount > 0 && (
          <span className='badge rounded-pill badge-secondary'>{unreadCount}</span>
        )}
      </div>
      <div className={`notification-dropdown onhover-show-div ${notificationDropDown ? 'active' : ''}`}>
        <div className="notification-header">
          <h6 className='f-18 mb-0 dropdown-title'>{Notification}</h6>
          {unreadCount > 0 && (
            <button
              className='mark-all-read-btn'
              onClick={markAllAsRead}
            >
              <FontAwesomeIcon icon={faCheck} /> Tout marquer comme lu
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="notification-loading">Chargement...</div>
        ) : error ? (
          <div className="notification-error">{error}</div>
        ) : (
          <ul style={{ maxHeight: '300px', overflowY: 'auto', margin: 0, padding: 0, listStyle: 'none' }}>
            {unreadNotifications.length === 0 ? (
              <li key="no-notifications" className="no-notifications">Aucune notification</li>
            ) : (
              unreadNotifications.map((notification) => (
                <li 
                  key={`notification-${notification._id}`}
                  className="notification-item unread"
                  style={{ borderLeftColor: NotificationService.getPriorityColor(notification.priority) }}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {renderNotificationContent(notification)}
                </li>
              ))
            )}
            <li key="view-all" className="view-all">
              <button 
                type="button"
                className='f-w-700 view-all-button' 
                onClick={() => {
                  setNotificationDropDown(false);
                  if (userRole === 'SuperAdmin') {
                    navigate('/notifications');
                  } else {
                    navigate(`/notifications/${layout}`);
                  }
                }}
              >
                <FontAwesomeIcon icon={faList} className="me-2" />
                {CHECKALL}
              </button>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
};

export default Notificationbar;
