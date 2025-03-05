import axios from "axios";
import { authHeader } from "../../Services/Auth"; // Utilisation de authHeader pour ajouter le token si nécessaire

// URL de base de l'API

/**
 * 🚀 Récupérer le total des utilisateurs par rôle
 * @returns {Promise<{totalPatients: number, totalMedecins: number, totalSuperAdmins: number}>}
 */
export const fetchTotalUsersByRole = async () => {
    try {
        const { data } = await axios.get("filteruser/total-by-role", {
            headers: authHeader(), // En-tête d'authentification
        });

        // Vérification de la réponse de l'API
        if (data.success) {
            return data.data; // Retourne les totaux des utilisateurs
        } else {
            console.error("Erreur lors de la récupération des totaux des utilisateurs.");
            return null;
        }
    } catch (error) {
        // Log détaillé pour débogage
        console.error("Erreur lors de la récupération des totaux des utilisateurs:", error);
        throw new Error(error.response?.data?.message || "Erreur serveur");
    }
};

/**
 * 🚀 Récupérer la liste des patients
 * @returns {Promise<Array<{nom: string, prenom: string, email: string}>>}
 */
export const fetchPatients = async () => {
    try {
        const { data } = await axios.get("filteruser/filter-patients", {
            headers: authHeader(), // En-tête d'authentification
        });

        // Vérification de la réponse de l'API
        if (data.success) {
            return data.data; // Retourne la liste des patients
        } else {
            console.error("Aucun patient trouvé.");
            return [];
        }
    } catch (error) {
        // Log détaillé pour débogage
        console.error("Erreur lors de la récupération des patients:", error);
        throw new Error(error.response?.data?.message || "Erreur serveur");
    }
};

/**
 * 🚀 Récupérer les données mensuelles des patients et médecins
 * @returns {Promise<{patients: number, medecins: number}>}
 */
export const fetchMonthlyPatientsAndMedecins = async () => {
    try {
        const { data } = await axios.get("filteruser/filter-patients-medecins-monthly", {
            headers: authHeader(), // En-tête d'authentification
        });

        // Vérification de la réponse de l'API
        if (data.success) {
            return data.data; // Retourne les données mensuelles
        } else {
            console.error("Erreur lors de la récupération des données mensuelles.");
            return { patients: 0, medecins: 0 };
        }
    } catch (error) {
        // Log détaillé pour débogage
        console.error("Erreur lors de la récupération des données mensuelles:", error);
        throw new Error(error.response?.data?.message || "Erreur serveur");
    }
};