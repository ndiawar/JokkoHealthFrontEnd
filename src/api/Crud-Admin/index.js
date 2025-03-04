// src/api/crudAdmin.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';

// Récupérer tous les utilisateurs
const getAllUsers = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Supprimer un utilisateur
const deleteUser = async (id, token) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Bloquer un utilisateur
const blockUser = async (id, token) => {
    await axios.put(`${API_URL}/${id}/block`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Débloquer un utilisateur
const unblockUser = async (id, token) => {
    await axios.put(`${API_URL}/${id}/unblock`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Mettre à jour un utilisateur
const updateUser = async (id, userData, token) => {
    const response = await axios.put(`${API_URL}/${id}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export { getAllUsers, deleteUser, blockUser, unblockUser, updateUser };
