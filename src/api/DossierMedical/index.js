// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Remplacez par l'URL correcte

// Fonction pour récupérer le dossier médical
export const getUserProfile = async (medicalRecordId) => {
    try {
        const response = await axios.get(`${API_URL}/medical/${medicalRecordId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        throw error;
    }
};

// Fonction pour mettre à jour le dossier médical
export const updateUserProfile = async (medicalRecordId, data) => {
    try {
        // Créer un objet pour ne contenir que les champs nécessaires
        const { nom, prenom, poids, age, email, groupeSanguin, chirurgie, hospitalisation, antecedentsFamiliaux } = data;
        const payload = { nom, prenom, poids, age, email, groupeSanguin, chirurgie, hospitalisation, antecedentsFamiliaux };

        const response = await axios.put(`${API_URL}/medical/${medicalRecordId}`, payload);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        throw error;
    }
};