import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchUsers,
  fetchUserById,
  registerUser as registerUserApi,
  updateUserProfile,
  blockUser,
  unblockUser,
  archiveUser,
  unarchiveUser,
  deleteUser
} from '../../api/users';
import $ from 'jquery';
import 'bootstrap-notify';

// Fonction utilitaire pour afficher les notifications
const showNotification = (message, type) => {
  $.notify({
    message: message
  }, {
    type: type,
    delay: 3000,
    placement: {
      from: "top",
      align: "right"
    },
    offset: {
      x: 20,
      y: 70
    }
  });
};

// Hook pour récupérer tous les utilisateurs
export const useFetchUsers = () => {
  return useQuery(['users'], fetchUsers, {
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour récupérer un utilisateur spécifique par son ID
export const useFetchUserById = (id) => {
  return useQuery(['user', id], () => fetchUserById(id), {
    enabled: !!id, // N'exécute la requête que si l'ID est défini
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour inscrire un utilisateur
export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData) => registerUserApi(userData),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      showNotification('Utilisateur inscrit avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour mettre à jour le profil utilisateur
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Invalide la requête pour rafraîchir les données
      showNotification('Profil utilisateur mis à jour avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour bloquer un utilisateur
export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation(blockUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Invalide la requête pour rafraîchir les données
      showNotification('Utilisateur bloqué avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour débloquer un utilisateur
export const useUnblockUser = () => {
  const queryClient = useQueryClient();
  return useMutation(unblockUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Invalide la requête pour rafraîchir les données
      showNotification('Utilisateur débloqué avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour archiver un utilisateur
export const useArchiveUser = () => {
  const queryClient = useQueryClient();
  return useMutation(archiveUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Invalide la requête pour rafraîchir les données
      showNotification('Utilisateur archivé avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour désarchiver un utilisateur
export const useUnarchiveUser = () => {
  const queryClient = useQueryClient();
  return useMutation(unarchiveUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Invalide la requête pour rafraîchir les données
      showNotification('Utilisateur désarchivé avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour supprimer un utilisateur
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Invalide la requête pour rafraîchir les données
      showNotification('Utilisateur supprimé avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};