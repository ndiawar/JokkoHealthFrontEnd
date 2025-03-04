import axios from "axios";
import { authHeader } from "../../Services/Auth"; // Utilisation de authHeader pour ajouter le token si nécessaire

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

// 🚀 Récupérer un dossier médical spécifique par son ID
export const fetchMedicalRecordById = async (id) => {
  try {
    const { data } = await axios.get(`medical/${id}`, {
      headers: authHeader(), // En-tête d'authentification
    });

    // Si le serveur retourne un succès, on retourne le dossier
    if (data.success) {
      return data.record; // Retourne le dossier médical
    } else {
      console.error(`Dossier médical avec ID ${id} non trouvé.`);
      return null; // Retourne null si aucun dossier n'a été trouvé
    }
  } catch (error) {
    // Log détaillé pour débogage
    console.error(`Erreur lors de la récupération du dossier médical avec l'ID ${id}:`, error);
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
    const { data } = await axios.put(`medical/${id}`, updates, {
      headers: authHeader(), // En-tête d'authentification
    });

    // Vérification de la réponse et gestion des erreurs
    if (data.success) {
      console.log("Dossier médical mis à jour avec succès.");
      return data.record; // Retourne le dossier mis à jour
    } else {
      console.error("Erreur lors de la mise à jour du dossier médical.");
      return null; // Retourne null si la mise à jour échoue
    }
  } catch (error) {
    // Log de l'erreur et gestion d'erreur
    console.error(`Erreur lors de la mise à jour du dossier médical avec l'ID ${id}:`, error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

// 🚀 Supprimer un dossier médical par son ID
export const deleteMedicalRecord = async (id) => {
  try {
    const { data } = await axios.delete(`medical/${id}`, {
      headers: authHeader(), // En-tête d'authentification
    });

    // Vérification de la réponse et gestion des erreurs
    if (data.success) {
      console.log("Dossier médical supprimé avec succès.");
      return data; // Retourne une réponse confirmant la suppression
    } else {
      console.error(`Erreur lors de la suppression du dossier médical avec l'ID ${id}.`);
      return null; // Retourne null si la suppression échoue
    }
  } catch (error) {
    // Log de l'erreur et gestion des erreurs réseau ou serveur
    console.error(`Erreur lors de la suppression du dossier médical avec l'ID ${id}:`, error);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};