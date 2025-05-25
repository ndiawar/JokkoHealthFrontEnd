import axios from "axios";
import { authHeader } from "../../Services/Auth"; // Importation du header d'authentification


// 🚀 Récupérer tous les dossiers médicaux
export const fetchMedicalRecords = async () => {
  try {
    const { data } = await axios.get('medical', {
      headers: authHeader(), // En-tête d'authentification
    });

    // Vérification de la réponse de l'API et renvoi des données appropriées
    if (data.success) {
      return data.records; // Si la réponse contient `records`, on les retourne
    } else {
      console.error("Aucun dossier médical trouvé.");
      return []; // Retourner un tableau vide en cas d'absence de données
    }
  } catch (error) {
    // Log détaillé pour débogage, capture des erreurs spécifiques du backend ou réseau
    console.error("Erreur lors de la récupération des dossiers médicaux:", error);
    // Gestion des erreurs spécifiques
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

// 🚀 Récupérer les informations de l'utilisateur
export const fetchUserData = async () => {
  try {
    console.log("🔄 Récupération des données de l'utilisateur...");
    console.log("Headers envoyés:", authHeader());

    const { data } = await axios.get('users/me', {
      headers: authHeader(),
    });

    console.log("✅ Données reçues:", data);

    return data.success ? data : null;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des données utilisateur:", error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};


// 🚀 Récupérer un dossier médical spécifique par son ID
// 🚀 Récupérer un dossier médical spécifique par son ID
export const fetchMedicalRecordById = async (id) => {
  try {
    console.log(`🔄 Récupération du dossier médical ID: ${id}...`);

    const { data } = await axios.get(`medical/${id}`, {
      headers: authHeader(),
    });

    // Affiche les données reçues dans la console
    console.log("✅ Données reçues:", data);

    // Vérifiez si les données contiennent les champs attendus
    if (data.success) {
      console.log("📋 Détails du dossier médical:", data.record);
    } else {
      console.error("❌ Erreur: Les données reçues ne contiennent pas de dossier médical valide.");
    }

    return data.success ? data.record : null;
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération du dossier médical ID ${id}:`, error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

// 🚀 Récupérer le dossier médical de l'utilisateur connecté
export const fetchMedicalRecordByUser = async () => {
  try {
    const { data } = await axios.get('medical/me', {
      headers: authHeader(), // En-tête d'authentification
    });

    // Si le serveur retourne un succès, on retourne le dossier
    if (data.success) {
      return data.record; // Retourne le dossier médical
    } else {
      console.error('Dossier médical non trouvé.');
      return null; // Retourne null si aucun dossier n'a été trouvé
    }
  } catch (error) {
    // Log détaillé pour débogage
    console.error('Erreur lors de la récupération du dossier médical de l\'utilisateur connecté:', error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

// 🚀 Mettre à jour un dossier médical par son ID
export const updateMedicalRecord = async ({ id, updates }) => {
  try {
    console.log(`🔄 Mise à jour du dossier médical ID: ${id}...`);
    
    const { data } = await axios.put(`medical/${id}`, updates, {
      headers: authHeader(),
    });

    console.log("✅ Dossier mis à jour:", data);

    return data.success ? data.record : null;
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour du dossier médical ID ${id}:`, error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

// 🚀 Supprimer un dossier médical par son ID
export const deleteMedicalRecord = async (id) => {
  try {
    console.log(`🗑️ Suppression du dossier médical ID: ${id}...`);

    const { data } = await axios.delete(`medical/${id}`, {
      headers: authHeader(),
    });

    console.log("✅ Suppression confirmée:", data);

    return data.success ? data : null;
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression du dossier médical ID ${id}:`, error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

// Fonction pour récupérer les statistiques des dossiers médicaux créés par mois pour le médecin connecté
export const getMedicalRecordsStatsByMonthForMedecin = async () => {
  try {
      const response = await axios.get('medical/medical-records/stats-by-month-for-medecin');
      return response.data; // Retourne les données de la réponse
  } catch (error) {
      console.error('Erreur lors de la récupération des statistiques des dossiers médicaux :', error.response ? error.response.data : error.message);
      throw error;
  }
};