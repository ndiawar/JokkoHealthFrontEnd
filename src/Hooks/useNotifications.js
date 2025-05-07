import { useState, useEffect, useCallback } from 'react';
import NotificationService from '../Services/notificationService';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [groupedNotifications, setGroupedNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Charger les notifications
    const loadNotifications = useCallback(async (options = {}) => {
        try {
            setLoading(true);
            setError(null);
            const data = await NotificationService.getUserNotifications(options);
            setNotifications(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Charger les notifications groupées
    const loadGroupedNotifications = useCallback(async () => {
        try {
            const data = await NotificationService.getGroupedNotifications();
            setGroupedNotifications(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Erreur lors du chargement des notifications groupées:', err);
            setGroupedNotifications([]);
        }
    }, []);

    // Charger les notifications non lues
    const loadUnreadNotifications = useCallback(async () => {
        try {
            const data = await NotificationService.getUnreadNotifications();
            setUnreadCount(Array.isArray(data) ? data.length : 0);
        } catch (err) {
            console.error('Erreur lors du chargement des notifications non lues:', err);
            setUnreadCount(0);
        }
    }, []);

    // Marquer une notification comme lue
    const markAsRead = useCallback(async (notificationId) => {
        try {
            await NotificationService.markAsRead(notificationId);
            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification._id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    // Marquer un groupe comme lu
    const markGroupAsRead = useCallback(async (groupId) => {
        try {
            await NotificationService.markGroupAsRead(groupId);
            setGroupedNotifications(prevGroups =>
                prevGroups.filter(group => group._id !== groupId)
            );
            // Recharger les notifications non lues
            loadUnreadNotifications();
        } catch (err) {
            setError(err.message);
        }
    }, [loadUnreadNotifications]);

    // Marquer toutes les notifications comme lues
    const markAllAsRead = useCallback(async () => {
        try {
            await NotificationService.markAllAsRead();
            setNotifications(prevNotifications =>
                prevNotifications.map(notification => ({ ...notification, isRead: true }))
            );
            setGroupedNotifications([]);
            setUnreadCount(0);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    // Supprimer une notification
    const deleteNotification = useCallback(async (notificationId) => {
        try {
            await NotificationService.deleteNotification(notificationId);
            setNotifications(prevNotifications =>
                prevNotifications.filter(notification => notification._id !== notificationId)
            );
            if (!notifications.find(n => n._id === notificationId)?.isRead) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (err) {
            setError(err.message);
        }
    }, [notifications]);

    // Charger les notifications au montage du composant
    useEffect(() => {
        loadNotifications();
        loadUnreadNotifications();
        loadGroupedNotifications();
    }, [loadNotifications, loadUnreadNotifications, loadGroupedNotifications]);

    return {
        notifications,
        groupedNotifications,
        unreadCount,
        loading,
        error,
        loadNotifications,
        loadUnreadNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        markGroupAsRead
    };
};

export default useNotifications; 