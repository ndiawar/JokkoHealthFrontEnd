import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SvgIcon from '../../../Components/Common/Component/SvgIcon';
import { CHECKALL, DeliveryComplete, DeliveryProcessing, Notification, OrderComplete, TicketsGenerated } from '../../../Constant';

const Notificationbar = () => {
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les notifications depuis le serveur
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des notifications:", error);
      }
    };

    fetchNotifications();

    // Optionnel : Mettre à jour les notifications toutes les X secondes
    const interval = setInterval(fetchNotifications, 10000); // 10 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <li className='onhover-dropdown'>
      <div className='notification-box' onClick={() => setNotificationDropDown(!notificationDropDown)}>
        <SvgIcon iconId='notification' />
        <span className='badge rounded-pill badge-secondary'>{notifications.length}</span>
      </div>
      <div className={`notification-dropdown onhover-show-div ${notificationDropDown ? 'active' : ''}`}>
        <h6 className='f-18 mb-0 dropdown-title'>{Notification}</h6>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className='b-l-primary border-4'>
              <p>{notification.message}</p>
              <span className='font-danger'>{new Date(notification.createdAt).toLocaleTimeString()}</span>
            </li>
          ))}
          <li>
            <a className='f-w-700' href='#javascript'>
              {CHECKALL}
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default Notificationbar;
