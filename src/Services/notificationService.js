import axios from 'axios';
import { authHeader } from './Auth';
import io from 'socket.io-client';
import { faCalendar, faHeartbeat, faExclamationTriangle, faBell } from '@fortawesome/free-solid-svg-icons';

// Configurer l'intercepteur Axios
axios.interceptors.request.use(
    config => {
        const headers = authHeader();
        if (headers.Authorization) {
            config.headers.Authorization = headers.Authorization;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

class NotificationService {
    static socket = null;
    static listeners = new Set();

    // Initialiser la connexion WebSocket
    static initializeSocket() {
        if (!this.socket) {
            this.socket = io('/api', {
                auth: {
                    token: document.cookie
                        .split('; ')
                        .find(row => row.startsWith('jwt='))
                        ?.split('=')[1]
                }
            });

            this.socket.on('connect', () => {
                console.log('Connecté au serveur de notifications');
            });

            this.socket.on('disconnect', () => {
                console.log('Déconnecté du serveur de notifications');
            });

            this.socket.on('notification', (notification) => {
                this.notifyListeners(notification);
            });
        }
        return this.socket;
    }

    // Ajouter un écouteur pour les nouvelles notifications
    static addNotificationListener(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    // Notifier tous les écouteurs
    static notifyListeners(notification) {
        this.listeners.forEach(callback => callback(notification));
    }

    // Récupérer toutes les notifications de l'utilisateur
    static async getUserNotifications(options = {}) {
        try {
            const { limit = 20, skip = 0, type, priority } = options;
            const params = new URLSearchParams();
            if (limit) params.append('limit', limit);
            if (skip) params.append('skip', skip);
            if (type) params.append('type', type);
            if (priority) params.append('priority', priority);

            const response = await axios.get(`/notifications?${params.toString()}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications:', error);
            throw error;
        }
    }

    // Récupérer les notifications non lues
    static async getUnreadNotifications() {
        try {
            const response = await axios.get('/notifications/unread');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications non lues:', error);
            throw error;
        }
    }

    // Marquer une notification comme lue
    static async markAsRead(notificationId) {
        try {
            const response = await axios.put(`/notifications/${notificationId}/read`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors du marquage de la notification comme lue:', error);
            throw error;
        }
    }

    // Marquer toutes les notifications comme lues
    static async markAllAsRead() {
        try {
            const response = await axios.put('/notifications/read-all');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors du marquage de toutes les notifications comme lues:', error);
            throw error;
        }
    }

    // Supprimer une notification
    static async deleteNotification(notificationId) {
        try {
            const response = await axios.delete(`/notifications/${notificationId}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la suppression de la notification:', error);
            throw error;
        }
    }

    // Récupérer les notifications groupées
    static async getGroupedNotifications() {
        try {
            const response = await axios.get('/notifications/grouped');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications groupées:', error);
            throw error;
        }
    }

    // Récupérer les détails d'une notification groupée
    static async getGroupedNotificationDetails(groupId) {
        try {
            const response = await axios.get(`/notifications/grouped/${groupId}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la notification groupée:', error);
            throw error;
        }
    }

    // Marquer une notification groupée comme lue
    static async markGroupAsRead(groupId) {
        try {
            const response = await axios.put(`/notifications/grouped/${groupId}/read`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors du marquage de la notification groupée comme lue:', error);
            throw error;
        }
    }

    // Récupérer les métriques de notification (admin uniquement)
    static async getNotificationMetrics() {
        try {
            const response = await axios.get('/notifications/metrics');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des métriques de notification:', error);
            throw error;
        }
    }

    // Méthode utilitaire pour formater la date de la notification
    static formatNotificationDate(date) {
        const notificationDate = new Date(date);
        const now = new Date();
        const diffInHours = Math.abs(now - notificationDate) / 36e5;

        if (diffInHours < 24) {
            return `Il y a ${Math.round(diffInHours)} heure${Math.round(diffInHours) > 1 ? 's' : ''}`;
        } else {
            return notificationDate.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    // Méthode utilitaire pour obtenir l'icône en fonction du type de notification
    static getNotificationIcon(type) {
        const icons = {
            appointment: faCalendar,
            sensor: faHeartbeat,
            emergency: faExclamationTriangle
        };
        return icons[type] || faBell;
    }

    // Méthode utilitaire pour obtenir la couleur en fonction de la priorité
    static getPriorityColor(priority) {
        const colors = {
            high: 'red',
            medium: 'orange',
            low: 'blue'
        };
        return colors[priority] || 'gray';
    }
}

export default NotificationService; 