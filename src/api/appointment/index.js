import axios from 'axios';

const API_URL = 'http://localhost:3001/api/appointments'; // Mets l'URL de ton backend

export const getAppointments = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Retourne les données
    } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
        throw error;
    }
};
// API: ajouter une méthode POST pour la demande de participation
// Exemple de fonction API pour envoyer la demande
export const demanderParticipation = async (appointmentId, patientId) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/appointments/${appointmentId}/demander-participation`, {
            patientId: patientId
        });
        return response.data;  // Retourne les données de la réponse
    } catch (error) {
        console.error('Erreur API:', error.response ? error.response.data : error.message);
        throw error;
    }
};
