import axios from "axios";
import { authHeader } from "../../Services/Auth";  // Utilisation de authHeader pour ajouter le token si nécessaire

// 🚀 Récupérer tous les dossiers médicaux
export const fetchMedicalRecords = async () => {
  try {
    // Effectuer une requête GET pour récupérer les dossiers médicaux à l'endpoint spécifié
    const { data } = await axios.get('medical', {
      headers: authHeader() // En-tête d'authentification
    });

    // Vérification si l'API a retourné des dossiers médicaux et renvoi des données appropriées
    return data.success ? data.records : []; // Assurez-vous que `data.records` existe dans la réponse
  } catch (error) {
    // Log de l'erreur pour débogage
    console.error("Erreur lors de la récupération des dossiers médicaux:", error);
    throw error; // Propagation de l'erreur pour gestion par le hook ou un autre composant
  }
};

// 🚀 Récupérer un dossier médical spécifique par son ID
export const fetchMedicalRecordById = async (id) => {
  try {
    const { data } = await axios.get(`medical/${id}`, {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du dossier médical avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Mettre à jour un dossier médical par son ID
export const updateMedicalRecord = async (id, updates) => {
  try {
    const { data } = await axios.put(`medical/${id}`, updates, {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du dossier médical avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Supprimer un dossier médical par son ID
export const deleteMedicalRecord = async (id) => {
  try {
    const { data } = await axios.delete(`medical/${id}`, {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors de la suppression du dossier médical avec l'ID ${id}:`, error);
    throw error;
  }
};