// apiusers/index.js
import axios from "axios";
import { authHeader } from "../../Services/Auth";  // Utilisation de authHeader pour ajouter le token si nécessaire

// 🚀 Récupérer tous les utilisateurs
export const fetchUsers = async () => {
  const { data } = await axios.get("users", {
    headers: authHeader() // Ajout de l'authHeader ici si besoin
  });
  return data.users;
};

// 🚀 Récupérer un utilisateur spécifique par son ID
export const fetchUserById = async (id) => {
  const { data } = await axios.get(`users/${id}`, {
    headers: authHeader() // Ajout de l'authHeader ici si besoin
  });
  return data;
};

// 🚀 Inscription d'un utilisateur (Register)
export const registerUser = async ({ nom, prenom, email, role, dateNaissance, sexe, telephone }) => {
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
};

// 🚀 Connexion d'un utilisateur (Login)
export const loginUser = async ({ email, motDePasse }) => {
  const { data } = await axios.post("users/login", {
    email,
    motDePasse
  });
  return data;
};




// 🚀 Mise à jour du profil utilisateur (Update)
export const updateUserProfile = async (id, { name, email, password, role_id }) => {
  const { data } = await axios.put(
    `users/${id}`,
    { name, email, password, role_id },
    {
      headers: authHeader() // Ajout du token dans les en-têtes pour sécuriser la requête
    }
  );
  return data;
};

// 🚀 Bloquer un utilisateur
export const blockUser = async (id) => {
  const { data } = await axios.put(`users/${id}/block`, {}, {
    headers: authHeader() // Ajout du token pour cette action
  });
  return data;
};

// 🚀 Débloquer un utilisateur
export const unblockUser = async (id) => {
  const { data } = await axios.put(`users/${id}/unblock`, {}, {
    headers: authHeader() // Ajout du token pour cette action
  });
  return data;
};

// 🚀 Archiver un utilisateur
export const archiveUser = async (id) => {
  const { data } = await axios.put(`users/${id}/archive`, {}, {
    headers: authHeader() // Ajout du token pour cette action
  });
  return data;
};

// 🚀 Désarchiver un utilisateur
export const unarchiveUser = async (id) => {
  const { data } = await axios.put(`users/${id}/unarchive`, {}, {
    headers: authHeader() // Ajout du token pour cette action
  });
  return data;
};

// 🚀 Supprimer un utilisateur
export const deleteUser = async (id) => {
  const { data } = await axios.delete(`users/${id}`, {
    headers: authHeader() // Ajout du token pour cette action
  });
  return data;
};

// 🚀 Déconnexion d'un utilisateur (Logout)
export const logoutUser = async () => {
  const { data } = await axios.post("users/logout", {}, {
    headers: authHeader() // Ajout du token pour cette action
  });
  return data;
};
