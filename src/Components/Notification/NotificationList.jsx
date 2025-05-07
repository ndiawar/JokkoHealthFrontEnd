import React, { useState } from 'react';
import useNotifications from '../../Hooks/useNotifications';
import NotificationService from '../../Services/notificationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './NotificationList.css';

const TABS = [
  { key: 'overview', label: 'Aperçu' },
  { key: 'appointment', label: 'Rendez-vous' },
  { key: 'emergency', label: 'Urgences' },
  { key: 'system', label: 'Système' }
];

const ITEMS_PER_PAGE = 3;

const NotificationList = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const {
    notifications,
    loading,
    error,
    markAsRead,
    deleteNotification
  } = useNotifications();

  // Filtrage par type
  const filteredNotifications = notifications.filter(n =>
    filter === 'all' ? true : n.type === filter
  );

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  // Gestionnaires de pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 3;

    // Logique pour afficher les pages de manière élégante
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return (
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        {pages.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={page}
              className={`pagination-button ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        ))}

        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  return (
    <div className="notification-page-container">
      <h1 className="notification-title">Notifications</h1>
      <div className="notification-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`notification-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="notification-filter-bar">
        <label>Filtrer par type :</label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Toutes</option>
          <option value="appointment">Rendez-vous</option>
          <option value="sensor">Capteur</option>
          <option value="emergency">Urgence</option>
          <option value="medical">Médical</option>
          <option value="system">Système</option>
        </select>
      </div>
      <div className="notification-list-modern">
        {loading ? (
          <div className="notification-loading">Chargement...</div>
        ) : error ? (
          <div className="notification-error">{error}</div>
        ) : currentNotifications.length === 0 ? (
          <div className="no-notifications-modern">Aucune notification</div>
        ) : (
          <>
            {currentNotifications.map(notification => (
              <div
                key={notification._id}
                className={`notification-modern-item${!notification.isRead ? ' unread' : ''}`}
              >
                <div className="notification-modern-icon">
                  <FontAwesomeIcon icon={NotificationService.getNotificationIcon(notification.type)} />
                </div>
                <div className="notification-modern-content">
                  <div className="notification-modern-title">{notification.title}</div>
                  <div className="notification-modern-message">{notification.message}</div>
                  <div className="notification-modern-date">
                    {NotificationService.formatNotificationDate(notification.createdAt)}
                  </div>
                </div>
                <div className="notification-modern-actions">
                  {!notification.isRead && (
                    <button
                      className="mark-read-btn"
                      onClick={() => markAsRead(notification._id)}
                      title="Marquer comme lu"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => deleteNotification(notification._id)}
                    title="Supprimer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
            {renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationList; 