import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import $ from "jquery";
import "bootstrap-notify";
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
} from "../../api/users";

// Fonction pour afficher les notifications d'erreur
const showErrorNotification = (message) => {
  $.notify({ message: message }, { type: "danger" });
};

const useUsers = () => {
  const queryClient = useQueryClient();

  // Requête pour tous les utilisateurs
  const {
    data: users,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    onError: (err) => {
      showErrorNotification(`Erreur lors du chargement des utilisateurs: ${err.message}`);
    },
  });

  // Requête pour un utilisateur spécifique
  const useUserById = (id) => {
    return useQuery({
      queryKey: ["user", id],
      queryFn: () => fetchUserById(id),
      enabled: !!id,
      onError: (err) => {
        showErrorNotification(`Erreur lors du chargement de l'utilisateur: ${err.message}`);
      },
    });
  };

  // Mutation d'inscription
  const { mutate: registerUserMutation, isLoading: registerLoading, error: registerError } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      $.notify({ message: "Utilisateur inscrit avec succès !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec de l'inscription: ${error.response?.data?.message || "Erreur serveur"}`
      );
    },
  });

  // Mutation de connexion
  const { mutate: loginUserMutation, isLoading: loginLoading, error: loginError } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      queryClient.invalidateQueries({ queryKey: ["user"] });
      $.notify({ message: "Connexion réussie !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec de la connexion: ${error.response?.data?.message || "Identifiants invalides"}`
      );
    },
  });

  // Mutation de mise à jour
  const { mutate: updateUserMutation, isLoading: updateLoading, error: updateError } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      $.notify({ message: "Profil utilisateur mis à jour !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec de la mise à jour: ${error.response?.data?.message || "Erreur serveur"}`
      );
    },
  });

  // Mutation de blocage
  const { mutate: blockUserMutation, isLoading: blockLoading, error: blockError } = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      $.notify({ message: "Utilisateur bloqué avec succès !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec du blocage: ${error.response?.data?.message || "Erreur serveur"}`
      );
    },
  });

  // Mutation de déblocage
  const { mutate: unblockUserMutation, isLoading: unblockLoading, error: unblockError } = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      $.notify({ message: "Utilisateur débloqué avec succès !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec du déblocage: ${error.response?.data?.message || "Erreur serveur"}`
      );
    },
  });

  // Mutation d'archivage
  const { mutate: archiveUserMutation, isLoading: archiveLoading, error: archiveError } = useMutation({
    mutationFn: archiveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      $.notify({ message: "Utilisateur archivé avec succès !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec de l'archivage: ${error.response?.data?.message || "Erreur serveur"}`
      );
    },
  });

  // Mutation de désarchivage
  const { mutate: unarchiveUserMutation, isLoading: unarchiveLoading, error: unarchiveError } = useMutation({
    mutationFn: unarchiveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      $.notify({ message: "Utilisateur désarchivé avec succès !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec du désarchivage: ${error.response?.data?.message || "Erreur serveur"}`
      );
    },
  });

  // Mutation de suppression
  const { mutate: deleteUserMutation, isLoading: deleteLoading, error: deleteError } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      $.notify({ message: "Utilisateur supprimé avec succès !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec de la suppression: ${error.response?.data?.message || "Erreur serveur"}`
      );
    },
  });

  // Mutation de déconnexion
  const { mutate: logoutUserMutation, isLoading: logoutLoading, error: logoutError } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      $.notify({ message: "Déconnexion réussie !" }, { type: "success" });
    },
    onError: (error) => {
      showErrorNotification(
        `Échec de la déconnexion: ${error.response?.data?.message || "Erreur serveur"}`
      );
    },
  });

  return {
    // Données
    users,
    loading,
    error,

    // Méthodes
    useUserById,

    // Mutations
    registerUserMutation,
    loginUserMutation,
    updateUserMutation,
    blockUserMutation,
    unblockUserMutation,
    archiveUserMutation,
    unarchiveUserMutation,
    deleteUserMutation,
    logoutUserMutation,

    // États de chargement
    isLoading: {
      register: registerLoading,
      login: loginLoading,
      update: updateLoading,
      block: blockLoading,
      unblock: unblockLoading,
      archive: archiveLoading,
      unarchive: unarchiveLoading,
      delete: deleteLoading,
      logout: logoutLoading,
    },

    // Erreurs
    errors: {
      register: registerError,
      login: loginError,
      update: updateError,
      block: blockError,
      unblock: unblockError,
      archive: archiveError,
      unarchive: unarchiveError,
      delete: deleteError,
      logout: logoutError,
    },
  };
};

export default useUsers;
