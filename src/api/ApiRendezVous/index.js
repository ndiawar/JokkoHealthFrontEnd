import axios from 'axios';
import { toast } from 'react-toastify';
import { authHeader } from '../../Services/Auth'; // Utilisation de authHeader pour ajouter le token si nécessaire
import 'react-toastify/dist/ReactToastify.css';


// 1. Créer un rendez-vous (par un médecin)
export const createAppointment = async ({ date, heure_debut, heure_fin, specialiste }) => {
    try {
      const { data } = await axios.post(
        '/rendezvous/create', // Endpoint de création de rendez-vous
        {
          date,
          heure_debut,
          heure_fin,
          specialiste,
        },
        {
          headers: authHeader(), // Ajout du token dans les en-têtes pour sécuriser la requête
        }
      );
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous:', error);
      throw error;
    }
  };

  // 2. Récupérer les rendez-vous disponibles pour un patient (basé sur son médecin)
export const getAppointments = async () => {
  try {
    const response = await axios.get('/rendezvous/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    throw error;
  }
};

// 3. Annuler un rendez-vous (par un patient)
export const getPendingAppointmentRequests = async () => {
  try {
    const response = await axios.get('/rendezvous/pending-requests', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous avec demande en attente:', error);
    throw error;
  }
};

// 4. Accepter une demande de rendez-vous (par un médecin)
export const getAcceptedAppointmentsWithParticipation = async () => {
    try {
      // Faire une requête GET pour récupérer les rendez-vous acceptés avec participation active
      const response = await axios.get('/rendezvous/accepted-participation', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;  // Retourne les données de la réponse
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous acceptés avec demande de participation active:', error);
      throw error;  // Jette l'erreur pour que tu puisses la gérer au niveau du composant
    }
  };
  

  // 5. Récupérer les rendez-vous acceptés avec demande de participation active (par un patient)
export const getAvailableAppointments = async () => {
    try {
      const response = await axios.get('/rendezvous/patient/available', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous disponibles:', error);
      toast.error('Erreur lors de la récupération des rendez-vous disponibles.', {
        position: 'top-right',
        autoClose: 3000,
      });
      throw error;
    }
  };

  // 6. Récupérer les rendez-vous acceptés avec demande de participation active (
export const requestAppointment = async (appointmentId) => {
  try {
    const response = await axios.put(
      `/rendezvous/patient/${appointmentId}/demande`,
      {}, // Pas de corps de requête nécessaire
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    toast.success('Demande de participation envoyée avec succès !', {
      position: 'top-right',
      autoClose: 3000,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la demande de participation:', error);
    toast.error('Erreur lors de la demande de participation.', {
      position: 'top-right',
      autoClose: 3000,
    });
    throw error;
  }
};

  // 7. Récupérer les rendez-vous acceptés avec demande de participation active (par un médecin)
export const updateDemandeStatut = async (appointmentId, statutDemande) => {
    try {
            const response = await axios.put(
                `/rendezvous/medecin/${appointmentId}/reponse`,
                { statutDemande },
                { headers: authHeader() }
            );

            toast.success(`Demande ${statutDemande} avec succès !`, {
                position: 'top-right',
                autoClose: 3000,
            });
        return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut:', error);
            toast.error('Erreur lors de la mise à jour du statut.', {
                position: 'top-right',
                autoClose: 3000,
            });
            throw error;
        }
    };

  export  const fetchAcceptedAppointmentsForPatient = async () => {
      try {
        const response = await axios.get('/rendezvous/accepted-for-patient', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data); // Liste des rendez-vous acceptés
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous acceptés', error);
      }
    };
    
    // Fonction pour récupérer les statistiques des rendez-vous par mois pour le médecin connecté
  export const getAppointmentsStatsByMonthForMedecin = async () => {
    try {
        const response = await axios.get('/rendezvous/stats/month');
        return response.data; // Retourne les données de la réponse
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques des rendez-vous:', error.response ? error.response.data : error.message);
        throw error;
    }
  };
    
    