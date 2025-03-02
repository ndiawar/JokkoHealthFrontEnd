import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMedicalRecords,
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
  // Utilisation du hook useQuery pour récupérer les dossiers médicaux
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['medicalRecords'], // Clé unique pour la requête
    queryFn: fetchMedicalRecords, // Fonction pour récupérer les données
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger'); // Notification en cas d'erreur
    },
    // Option pour mettre en cache et refetch des données à intervalle régulier si nécessaire
    refetchOnWindowFocus: false, // Exemple d'option pour éviter le refetch automatique lors du focus de la fenêtre
    retry: 1, // Nombre de tentatives en cas d'échec de la requête
  });

  // Retourne les données, les erreurs et l'état de chargement
  return { data, error, isLoading, isError };
};

// Hook pour récupérer un dossier médical spécifique par son ID
export const useFetchMedicalRecordById = (id) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['medicalRecord', id],
    queryFn: () => fetchMedicalRecordById(id),
    enabled: !!id, // N'exécute la requête que si l'ID est défini
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });

  return { data, error, isLoading, isError };
};

// Hook pour mettre à jour un dossier médical
export const useUpdateMedicalRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries(['medicalRecords']); // Invalide la requête pour rafraîchir les données
      showNotification('Dossier médical mis à jour avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};

// Hook pour supprimer un dossier médical
export const useDeleteMedicalRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries(['medicalRecords']); // Invalide la requête pour rafraîchir les données
      showNotification('Dossier médical supprimé avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur: ${error.message}`, 'danger');
    }
  });
};
