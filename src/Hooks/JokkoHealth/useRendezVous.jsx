import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAppointments,
  fetchAppointmentById,
  createAppointment,
  requestParticipation,
  manageRequest,
  fetchPatientHistory,
  fetchDoctorHistory,
  fetchAppointmentsByDoctor,
  fetchAcceptedAppointments,
  fetchRejectedAppointments,
  fetchAcceptedAppointmentsToday
} from '../../api/rendezvous';  // Utilise la casse correcte ici
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

// Hook pour créer un rendez-vous
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      showNotification('Rendez-vous créé avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur lors de la création du rendez-vous: ${error.message}`, 'danger');
    }
  });
};

// Hook pour récupérer tous les rendez-vous
export const useFetchAppointments = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    onError: (error) => {
      showNotification(`Erreur lors de la récupération des rendez-vous: ${error.message}`, 'danger');
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { data, error, isLoading, isError };
};

// Hook pour demander la participation à un rendez-vous
export const useRequestParticipation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      showNotification('Demande de participation envoyée avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur lors de la demande de participation: ${error.message}`, 'danger');
    }
  });
};

// Hook pour gérer l'acceptation ou le rejet de la demande
export const useManageRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: manageRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      showNotification('Demande gérée avec succès', 'success');
    },
    onError: (error) => {
      showNotification(`Erreur lors de la gestion de la demande: ${error.message || error}`, 'danger');
    }
  });
};

// Fonction pour calculer les statistiques sur les spécialités
const calculateSpecialiteStats = (appointments) => {
  return appointments.reduce((acc, { doctorId }) => {
    const spec = doctorId?.specialite || 'Non spécifiée';
    acc[spec] = (acc[spec] || 0) + 1;
    return acc;
  }, {});
};

// Fonction pour extraire les raisons de rejet
const extractRejectionReasons = (appointments) => {
  return appointments
    .filter(app => app.statutDemande === 'rejeté' && app.raisonRejet)
    .map(app => app.raisonRejet);
};

// Hook pour les rendez-vous acceptés
export const useFetchAcceptedAppointments = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['acceptedAppointments'],
    queryFn: fetchAcceptedAppointments,
    select: (responseData) => ({
      rawData: responseData,
      stats: calculateSpecialiteStats(responseData),
      meta: {
        count: responseData.length,
        lastUpdated: new Date()
      }
    }),
    onError: (error) => {
      showNotification(`Erreur lors de la récupération des rendez-vous acceptés: ${error.message}`, 'danger');
    }
  });

  return { 
    data: data?.rawData || [],
    stats: data?.stats || {},
    meta: data?.meta,
    error,
    isLoading,
    isError
  };
};

// Hook pour les rendez-vous refusés
export const useFetchRejectedAppointments = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['rejectedAppointments'],
    queryFn: fetchRejectedAppointments,
    select: (responseData) => ({
      rawData: responseData,
      reasons: extractRejectionReasons(responseData),
      meta: {
        count: responseData.length,
        rejectionRate: responseData.length > 0 ? 
          (responseData.filter(a => a.statutDemande === 'rejeté').length / responseData.length) * 100 : 0
      }
    }),
    onError: (error) => {
      showNotification(`Erreur lors de la récupération des rendez-vous refusés: ${error.message}`, 'danger');
    }
  });

  return {
    data: data?.rawData || [],
    reasons: data?.reasons || [],
    meta: data?.meta || {},
    error,
    isLoading,
    isError
  };
};

// // Hook React Query pour récupérer les demandes de participation
// export const useParticipationRequests = (appointmentId) => {
//   return useQuery({
//     queryKey: ['participationRequests', appointmentId],
//     queryFn: () => getDemandesParticipation(appointmentId),
//     enabled: !!appointmentId, // Assurez-vous que l'ID du rendez-vous est défini
//   });
// };

// Hook React Query pour récupérer les rendez-vous acceptés aujourd'hui
export const useAcceptedAppointmentsToday = () => {
  return useQuery({
    queryKey: ['acceptedAppointmentsToday'],
    queryFn: fetchAcceptedAppointmentsToday,
    enabled: localStorage.getItem('userRole') === 'Medecin',
  });
};

// Hook pour récupérer un rendez-vous par son ID
export const useFetchAppointmentById = (id) => {
  const isValidId = /^[0-9a-fA-F]{24}$/.test(id);

  return useQuery({
    queryKey: ['appointment', id],
    queryFn: () => fetchAppointmentById(id),
    enabled: isValidId,
    onError: (error) => {
      showNotification(`Erreur lors de la récupération du rendez-vous: ${error.message}`, 'danger');
    }
  });
};


// Hook pour afficher l'historique des rendez-vous d'un patient
export const useFetchPatientHistory = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['patientHistory'],
    queryFn: fetchPatientHistory,
    onError: (error) => {
      showNotification(`Erreur lors de la récupération de l'historique des rendez-vous du patient: ${error.message}`, 'danger');
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { data, error, isLoading, isError };
};

// Hook pour afficher l'historique des rendez-vous d'un médecin
export const useFetchDoctorHistory = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['doctorHistory'],
    queryFn: fetchDoctorHistory,
    onError: (error) => {
      showNotification(`Erreur lors de la récupération de l'historique des rendez-vous du médecin: ${error.message}`, 'danger');
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { data, error, isLoading, isError };
};

// Hook pour afficher les rendez-vous créés par le médecin d'un patient
export const useFetchAppointmentsByDoctor = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['appointmentsByDoctor'],
    queryFn: fetchAppointmentsByDoctor,
    onError: (error) => {
      showNotification(`Erreur lors de la récupération des rendez-vous du médecin: ${error.message}`, 'danger');
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { data, error, isLoading, isError };
};
