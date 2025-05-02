import axios from 'axios';
import { toast } from 'react-toastify';
import { authHeader } from '../../Services/Auth'; // Utilisation de authHeader pour ajouter le token si nécessaire
import 'react-toastify/dist/ReactToastify.css';


// 1. Créer un rendez-vous (par un médecin)
export const createAppointment = async ({ date, heure_debut, heure_fin, specialiste }) => {
    try {
        const { data } = await axios.post(
            '/rendezvous/create',
            { date, heure_debut, heure_fin, specialiste },
            { headers: authHeader() }
        );
        return data;
    } catch (error) {
        console.error('Erreur lors de la création du rendez-vous:', error);
        throw error;
    }
};

// 2. Récupérer les rendez-vous disponibles pour un patient
export const getAvailableAppointments = async () => {
    try {
        const { data } = await axios.get('/rendezvous/patient/available', {
            headers: authHeader()
        });
        console.log('Rendez-vous disponibles:', data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous disponibles:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération des rendez-vous disponibles');
        throw error;
    }
};

// 3. Demander à participer à un rendez-vous (par un patient)
export const requestAppointment = async (appointmentId, patientId) => {
    try {
        const { data } = await axios.put(
            `/rendezvous/patient/${appointmentId}/demande`,
            { patientId },
            { headers: authHeader() }
        );
        toast.success('Demande de participation envoyée avec succès !');
        return data;
    } catch (error) {
        console.error('Erreur lors de la demande de participation:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la demande de participation');
        throw error;
    }
};

// 4. Gérer une demande de rendez-vous (par un médecin)
export const handleAppointmentRequest = async (appointmentId, statutDemande, patientId) => {
    try {
        const { data } = await axios.put(
            `/rendezvous/medecin/${appointmentId}/reponse`,
            { statutDemande, patientId },
            { headers: authHeader() }
        );
        toast.success(`Demande ${statutDemande} avec succès !`);
        return data;
    } catch (error) {
        console.error('Erreur lors de la gestion de la demande:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la gestion de la demande');
        throw error;
    }
};

// 5. Récupérer les rendez-vous selon le rôle (médecin/patient)
export const getAppointments = async () => {
    try {
        const { data } = await axios.get('/rendezvous/', {
            headers: authHeader()
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération des rendez-vous');
        throw error;
    }
};

// 6. Récupérer les demandes en attente
export const getPendingAppointmentRequests = async () => {
    try {
        const { data } = await axios.get('/rendezvous/pending-requests', {
            headers: authHeader()
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes en attente:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération des demandes en attente');
        throw error;
    }
};

// 7. Récupérer les rendez-vous acceptés
export const getAcceptedAppointmentRequests = async () => {
    try {
        const { data } = await axios.get('/rendezvous/accepted-participation', {
            headers: authHeader()
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous acceptés:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération des rendez-vous acceptés');
        throw error;
    }
};

// 8. Récupérer les rendez-vous acceptés pour un patient
export const getAcceptedAppointmentsForPatient = async () => {
    try {
        const { data } = await axios.get('/rendezvous/accepted-for-patient', {
            headers: authHeader()
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous acceptés:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération des rendez-vous acceptés');
        throw error;
    }
};

// 9. Récupérer tous les rendez-vous
export const getAllAppointments = async () => {
    try {
        const { data } = await axios.get('/rendezvous/tous', {
            headers: authHeader()
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les rendez-vous:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération de tous les rendez-vous');
        throw error;
    }
};

// 10. Récupérer les statistiques des rendez-vous par mois (pour les médecins)
export const getAppointmentsStatsByMonthForMedecin = async () => {
    try {
        const { data } = await axios.get('/rendezvous/stats/month', {
            headers: authHeader()
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération des statistiques');
        throw error;
    }
};
    
    