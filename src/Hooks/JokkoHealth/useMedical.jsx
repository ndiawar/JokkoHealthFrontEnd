import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMedicalRecords, // Renommage si nécessaire
  fetchMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord
} from '../../api/medical';

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

// Hook pour récupérer tous les dossiers médicaux
export const useFetchMedicalRecords = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['medicalRecords'], // Clé unique pour la requête
    queryFn: fetchMedicalRecords, // Fonction pour récupérer les données
    onError: (error) => {
      showNotification(`Erreur lors de la récupération des dossiers médicaux: ${error.message}`, 'danger');
    },
    // Options supplémentaires
    refetchOnWindowFocus: false, // Ne pas refetch quand l'utilisateur revient dans l'onglet
    retry: 1, // Nombre de tentatives en cas d'échec de la requête
  });

  // Retourne les données, l'état de chargement, et les erreurs
  return { data, error, isLoading, isError };
};

// Hook pour récupérer un dossier médical spécifique par son ID
export const useFetchMedicalRecordById = (id) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['medicalRecord', id],
    queryFn: () => fetchMedicalRecordById(id),
    enabled: !!id, // La requête ne s'exécute que si l'ID est valide
    onError: (error) => {
      showNotification(`Erreur lors de la récupération du dossier médical: ${error.message}`, 'danger');
    }
  });

  return { data, error, isLoading, isError };
};

// Hook pour mettre à jour un dossier médical
export const useUpdateMedicalRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateMedicalRecord,
    onSuccess: (data) => {
      // Invalider les données après une mise à jour pour forcer un nouveau fetch
      queryClient.invalidateQueries(['medicalRecords']);
      showNotification('Dossier médical mis à jour avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur lors de la mise à jour du dossier médical: ${error.message}`, 'danger');
    }
  });
};

// Hook pour supprimer un dossier médical
export const useDeleteMedicalRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedicalRecord,
    onSuccess: () => {
      // Invalider les données après une suppression pour forcer un nouveau fetch
      queryClient.invalidateQueries(['medicalRecords']);
      showNotification('Dossier médical supprimé avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur lors de la suppression du dossier médical: ${error.message}`, 'danger');
    }
  });
};
