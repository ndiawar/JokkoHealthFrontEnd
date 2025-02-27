import { useMutation, useQuery, useQueryClient } from "react-query";
import $ from "jquery";  // Importation de jQuery
import "bootstrap-notify";  // Importation de Bootstrap Notify
import {
  fetchUsers,
  fetchUserById,
  registerUser,
  loginUser,
  updateUserProfile,
  blockUser,
  unblockUser,
  archiveUser,
  unarchiveUser,
  deleteUser,
  logoutUser,
} from "../api/users"; // Import des méthodes d'API

const useUsers = () => {
  const queryClient = useQueryClient();

  // Requête pour récupérer tous les utilisateurs
  const {
    data: users,
    isLoading: loading,
    error,
  } = useQuery("users", fetchUsers, {
    onError: (err) => {
      $.notify(
        { message: `Erreur lors du chargement des utilisateurs: ${err.message}` },
        { type: "danger" }
      );
    },
  });

  // Requête pour récupérer un utilisateur spécifique par son ID
  const fetchUser = async (id) => {
    const { data } = await fetchUserById(id);
    return data;
  };

  // Mutation pour inscrire un utilisateur
  const {
    mutate: registerUserMutation,
    isLoading: registerLoading,
    error: registerError,
  } = useMutation(registerUser, {
    onSuccess: (data) => {
      $.notify(
        { message: "L'utilisateur a été inscrit avec succès." },
        { type: "success" }
      );
    },
    onError: (error) => {
      $.notify(
        { message: `Erreur d'inscription: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  // Mutation pour se connecter
  const {
    mutate: loginUserMutation,
    isLoading: loginLoading,
    error: loginError,
  } = useMutation(loginUser, {
    onSuccess: (data) => {
      $.notify(
        { message: "Bienvenue ! Vous êtes connecté." },
        { type: "success" }
      );
    },
    onError: (error) => {
      $.notify(
        { message: `Erreur de connexion: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  // Mutation pour mettre à jour un utilisateur
  const {
    isLoading: updateLoading,
    mutate: updateUserMutation,
    error: updateError,
  } = useMutation(updateUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      $.notify(
        { message: "Les informations de l'utilisateur ont été mises à jour avec succès." },
        { type: "success" }
      );
    },
    onError: (error) => {
      $.notify(
        { message: `Échec de la mise à jour: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  // Mutation pour bloquer un utilisateur
  const {
    isLoading: blockLoading,
    mutate: blockUserMutation,
    error: blockError,
  } = useMutation(blockUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      $.notify(
        { message: "L'utilisateur a été bloqué avec succès." },
        { type: "success" }
      );
    },
    onError: (error) => {
      $.notify(
        { message: `Erreur de blocage: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  // Mutation pour débloquer un utilisateur
  const {
    isLoading: unblockLoading,
    mutate: unblockUserMutation,
    error: unblockError,
  } = useMutation(unblockUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      $.notify(
        { message: "L'utilisateur a été débloqué avec succès." },
        { type: "success" }
      );
    },
    onError: (error) => {
      $.notify(
        { message: `Erreur de déblocage: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  // Mutation pour archiver un utilisateur
  const {
    isLoading: archiveLoading,
    mutate: archiveUserMutation,
    error: archiveError,
  } = useMutation(archiveUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      $.notify(
        { message: "L'utilisateur a été archivé avec succès." },
        { type: "success" }
      );
    },
    onError: (error) => {
      $.notify(
        { message: `Erreur d'archivage: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  // Mutation pour désarchiver un utilisateur
  const {
    isLoading: unarchiveLoading,
    mutate: unarchiveUserMutation,
    error: unarchiveError,
  } = useMutation(unarchiveUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      $.notify(
        { message: "L'utilisateur a été désarchivé avec succès." },
        { type: "success" }
      );
    },
    onError: (error) => {
      $.notify(
        { message: `Erreur de désarchivage: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  // Mutation pour supprimer un utilisateur
  const {
    isLoading: deleteLoading,
    mutate: deleteUserMutation,
    error: deleteError,
  } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      $.notify(
        { message: "L'utilisateur a été supprimé avec succès." },
        { type: "success" }
      );
    },
    onError: (error) => {
      $.notify(
        { message: `Erreur de suppression: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  // Mutation pour déconnecter un utilisateur
  const {
    isLoading: logoutLoading,
    mutate: logoutUserMutation,
    error: logoutError,
  } = useMutation(logoutUser, {
    onSuccess: () => {
      $.notify(
        { message: "Vous avez été déconnecté." },
        { type: "success" }
      );
      // Effectuer un redirect si nécessaire
    },
    onError: (error) => {
      $.notify(
        { message: `Erreur de déconnexion: ${error.response?.data?.message || "Une erreur est survenue."}` },
        { type: "danger" }
      );
    },
  });

  return {
    users,
    loading,
    error,
    registerLoading,
    registerError,
    registerUserMutation,
    loginLoading,
    loginError,
    loginUserMutation,
    updateLoading,
    updateError,
    updateUserMutation,
    blockLoading,
    blockError,
    blockUserMutation,
    unblockLoading,
    unblockError,
    unblockUserMutation,
    archiveLoading,
    archiveError,
    archiveUserMutation,
    unarchiveLoading,
    unarchiveError,
    unarchiveUserMutation,
    deleteLoading,
    deleteError,
    deleteUserMutation,
    logoutLoading,
    logoutError,
    logoutUserMutation,
  };
};

export default useUsers;
