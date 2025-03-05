import axios from "axios";
import { authHeader } from "../../Services/Auth"; // Importation du header d'authentification

const API_BASE_URL = "http://localhost:3001/api"; // Définition de l'URL de base pour l'API


// 🚀 Récupérer le dossier médical de l'utilisateur connecté
export const fetchMyMedicalRecord = async () => {
  try {
    console.log("🔄 Récupération du dossier médical de l'utilisateur connecté...");

    const { data } = await axios.get("medical/me", {
      headers: authHeader(),
    });

    console.log("✅ Données reçues:", data);

    return data.success ? data.record : null;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du dossier médical de l'utilisateur :", error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

// 🚀 Récupérer les informations de l'utilisateur
export const fetchUserData = async () => {
  try {
    console.log("🔄 Récupération des données de l'utilisateur...");
    console.log("Headers envoyés:", authHeader());

    const { data } = await axios.get(`${API_BASE_URL}/users/me`, {
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

    const { data } = await axios.get(`${API_BASE_URL}/medical/${id}`, {
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
    
    const { data } = await axios.put(`${API_BASE_URL}/medical/${id}`, updates, {
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

    const { data } = await axios.delete(`${API_BASE_URL}/medical/${id}`, {
      headers: authHeader(),
    });

    console.log("✅ Suppression confirmée:", data);

    return data.success ? data : null;
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression du dossier médical ID ${id}:`, error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};