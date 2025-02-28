import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Remplacez avec votre URL de base

// Fonction pour récupérer les rendez-vous
export const fetchAppointments = async () => {
    try {
        const response = await axios.get(`${API_URL}/appointments`);
        return response.data;  // Retourne les données des rendez-vous
    } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous", error);
        throw error;
    }
};
