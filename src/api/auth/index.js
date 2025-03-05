import axios from "axios";
import { authHeader } from "../../Services/Auth";  // Utilisation de authHeader pour ajouter le token si nécessaire


// 🚀 Demande de réinitialisation de mot de passe (mot de passe oublié)
export const forgotPassword = async (email) => {
  try {
    // Modifiez l'URL ici pour inclure le domaine complet
    const { data } = await axios.post("http://localhost:3001/api/auth/forgot-password", { email });
    return data; // Retourner la réponse de l'API
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation de mot de passe:", error.response || error.message);
    throw error; // Rejeter l'erreur pour qu'elle soit gérée ailleurs (par exemple, dans un catch)
  }
};
// 🚀 Fin de la demande de réinitialisation de mot de passe


// 📌 Fonction de réinitialisation du mot de passe côté Frontend
export const resetPassword = async (token, id, newPassword, confirmPassword) => {
    try {
        // Vérification des paramètres
        console.log("Token envoyé :", token);
        console.log("ID envoyé :", id);
        console.log("Nouveau mot de passe envoyé :", newPassword);
        console.log("Confirmation du mot de passe envoyé :", confirmPassword);

        // Vérification que les mots de passe correspondent
        if (newPassword !== confirmPassword) {
            throw new Error("Les mots de passe ne correspondent pas.");
        }

        // Envoi de la requête pour réinitialiser le mot de passe
        const { data } = await axios.post(
            "http://localhost:3001/api/auth/reset-password", // URL de l'API Backend
            { newPassword, confirmPassword }, // Envoi des nouveaux mots de passe
            { params: { token, id } } // Paramètres de requête avec token et id
        );
        return data; // Retourner la réponse
    } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe:", error);
        throw error; // Si une erreur survient, elle est renvoyée
    }
};




// 🚀 Changer de mot de passe pour un utilisateur authentifié
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const { data } = await axios.put("auth/change-password", { currentPassword, newPassword }, {
      headers: authHeader() // Ajout du token dans les en-têtes pour sécuriser la requête
    });
    return data;
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    throw error;
  }
};
