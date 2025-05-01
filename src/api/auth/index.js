import axios from "axios";
import { authHeader } from "../../Services/Auth";

// Classe d'erreur personnalisée pour les erreurs d'API
class ApiError extends Error {
  constructor(message, data = null) {
    super(message);
    this.name = 'ApiError';
    this.data = data;
    this.success = false;
  }
}

// 🚀 Demande de réinitialisation de mot de passe (mot de passe oublié)
export const forgotPassword = async (email) => {
  try {
    // Validation de l'email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ApiError("Veuillez fournir une adresse email valide");
    }

    const { data } = await axios.post("auth/forgot-password", { email });
    return {
      success: true,
      message: data.message || "Un email de réinitialisation a été envoyé",
      data
    };
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation de mot de passe:", error);
    throw new ApiError(
      error.response?.data?.message || "Une erreur est survenue lors de la demande de réinitialisation",
      error.response?.data || error
    );
  }
};

// 📌 Fonction de réinitialisation du mot de passe côté Frontend
export const resetPassword = async (token, id, newPassword, confirmPassword) => {
  try {
    // Validation des paramètres
    if (!token || !id) {
      throw new ApiError("Token ou ID manquant");
    }

    if (!newPassword || !confirmPassword) {
      throw new ApiError("Les mots de passe sont requis");
    }

    // Validation de la force du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new ApiError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
    }

    // Vérification que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      throw new ApiError("Les mots de passe ne correspondent pas");
    }

    const { data } = await axios.post(
      "auth/reset-password",
      { newPassword, confirmPassword },
      { params: { token, id } }
    );

    return {
      success: true,
      message: data.message || "Mot de passe réinitialisé avec succès",
      data
    };
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    throw new ApiError(
      error.response?.data?.message || error.message || "Une erreur est survenue lors de la réinitialisation",
      error.response?.data || error
    );
  }
};

// 🚀 Vérification du mot de passe actuel
export const verifyCurrentPassword = async (currentPassword) => {
  console.log("Début de verifyCurrentPassword dans le frontend");
  console.log("Mot de passe à vérifier:", currentPassword);
  
  try {
    if (!currentPassword) {
      throw new ApiError("Le mot de passe actuel est requis");
    }

    const headers = authHeader();
    console.log("En-têtes de la requête:", headers);

    const { data } = await axios.post(
      "auth/verify-current-password",
      { currentPassword },
      { headers }
    );

    console.log("Réponse du serveur:", data);

    if (!data || typeof data.isValid === 'undefined') {
      throw new ApiError("Réponse invalide du serveur");
    }

    return {
      success: true,
      isValid: data.isValid,
      message: data.message || (data.isValid ? "Mot de passe correct" : "Mot de passe incorrect"),
      data
    };
  } catch (error) {
    console.error("Erreur détaillée dans verifyCurrentPassword (frontend):", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new ApiError(
      error.response?.data?.message || "Une erreur est survenue lors de la vérification du mot de passe",
      error.response?.data || error
    );
  }
};

// 🚀 Changer de mot de passe pour un utilisateur authentifié
export const changePassword = async (currentPassword, newPassword, confirmPassword) => {
  try {
    // Validation des paramètres
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new ApiError("Tous les champs sont requis");
    }

    // Validation de la force du nouveau mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new ApiError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
    }

    // Vérification que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      throw new ApiError("Les mots de passe ne correspondent pas");
    }

    // Vérification que le nouveau mot de passe est différent de l'ancien
    if (currentPassword === newPassword) {
      throw new ApiError("Le nouveau mot de passe doit être différent de l'ancien");
    }

    const { data } = await axios.post(
      "auth/change-password",
      { currentPassword, newPassword, confirmPassword },
      { headers: authHeader() }
    );

    return {
      success: true,
      message: data.message || "Mot de passe modifié avec succès",
      data
    };
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    throw new ApiError(
      error.response?.data?.message || error.message || "Une erreur est survenue lors du changement de mot de passe",
      error.response?.data || error
    );
  }
};
