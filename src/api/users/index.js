import axios from "axios";
import { authHeader } from "../../Services/Auth";  // Utilisation de authHeader pour ajouter le token si nécessaire

// 🚀 Récupérer tous les utilisateurs
export const fetchUsers = async () => {
  try {
    const { data } = await axios.get("users", {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data.users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

// 🚀 Récupérer un utilisateur spécifique par son ID
export const fetchUserById = async (id) => {
  try {
    const { data } = await axios.get(`users/${id}`, {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Inscription d'un utilisateur (Register)
export const registerUser = async ({ nom, prenom, email, role, dateNaissance, sexe, telephone }) => {
  try {
    const { data } = await axios.post("users/register", {
      nom,
      prenom,
      email,
      role,
      dateNaissance,
      sexe,
      telephone
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur:", error);
    throw error;
  }
};

// 🚀 Mise à jour du profil utilisateur (Update)
export const updateUserProfile = async (id, { name, email, password, role_id }) => {
  try {
    const { data } = await axios.put(
      `users/${id}`,
      { name, email, password, role_id },
      {
        headers: authHeader() // Ajout du token dans les en-têtes pour sécuriser la requête
      }
    );
    return data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du profil de l'utilisateur avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Bloquer un utilisateur
export const blockUser = async (id) => {
  try {
    const { data } = await axios.put(`users/${id}/block`, {}, {
      headers: authHeader() // Ajout du token pour cette action
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors du blocage de l'utilisateur avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Débloquer un utilisateur
export const unblockUser = async (id) => {
  try {
    const { data } = await axios.put(`users/${id}/unblock`, {}, {
      headers: authHeader() // Ajout du token pour cette action
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors du déblocage de l'utilisateur avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Archiver un utilisateur
export const archiveUser = async (id) => {
  try {
    const { data } = await axios.put(`users/${id}/archive`, {}, {
      headers: authHeader() // Ajout du token pour cette action
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors de l'archivage de l'utilisateur avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Désarchiver un utilisateur
export const unarchiveUser = async (id) => {
  try {
    const { data } = await axios.put(`users/${id}/unarchive`, {}, {
      headers: authHeader() // Ajout du token pour cette action
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors du désarchivage de l'utilisateur avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`users/${id}`, {
      headers: authHeader() // Ajout du token pour cette action
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, error);
    throw error;
  }
};

// �� Réinitialiser le mot de passe d'un utilisateur
export const sendPasswordResetEmail = async (email) => {
  try {
    const { data } = await axios.post("users/reset-password", {
      email
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    throw error;
  }
};

// Créer nouveau mot de passe
export const createNewPassword = async (token, password) => {
  try {
    const { data } = await axios.put("users/reset-password", {
      token,
      password
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la création du nouveau mot de passe:", error);
    throw error;
  }
};

// 🚀 Connexion d'un utilisateur (Login)
export const loginUser = async ({ email, motDePasse }) => {
  const { data } = await axios.post("users/login", {
    email,
    motDePasse
  });
  return data;
};