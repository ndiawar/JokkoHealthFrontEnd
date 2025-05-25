// src/api.js
import axios from 'axios';


// Fonction pour récupérer le dossier médical
export const getUserProfile = async (medicalRecordId) => {
    try {
        const response = await axios.get(`medical/${medicalRecordId}`);
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

        const response = await axios.put(`medical/${medicalRecordId}`, payload);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        throw error;
    }
};