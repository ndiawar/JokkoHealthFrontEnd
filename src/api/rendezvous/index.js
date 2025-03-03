import axios from "axios";
import { authHeader } from "../../Services/Auth";  // Utilisation de authHeader pour ajouter le token si nécessaire

// 🚀 Créer un rendez-vous
export const createAppointment = async ({ date, heure_debut, heure_fin, specialiste }) => {
  try {
    const { data } = await axios.post("appointments/create", {
      date,
      heure_debut,
      heure_fin,
      specialiste
    }, {
      headers: authHeader() // Ajout du token dans les en-têtes pour sécuriser la requête
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    throw error;
  }
};
// 🚀 Récupérer tous les rendez-vous
export const fetchAppointments = async () => {
  try {
    const { data } = await axios.get("appointments", {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    throw error;
  }
};


// 🚀 Demander la participation à un rendez-vous
export const requestParticipation = async (id, { patientId }) => {
  try {
    const { data } = await axios.post(`appointments/${id}/demander-participation`, {
      patientId
    }, {
      headers: authHeader() // Ajout du token pour cette action
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors de la demande de participation au rendez-vous avec l'ID ${id}:`, error);
    throw error;
  }
};

// 🚀 Gérer l'acceptation ou le rejet de la demande
export const manageRequest = async (id, { statutDemande }) => {
  try {
    const { data } = await axios.patch(`appointments/${id}/gestion-demande`, {
      statutDemande
    }, {
      headers: authHeader() // Ajout du token pour cette action
    });
    return data;
  } catch (error) {
    console.error(`Erreur lors de la gestion de la demande pour le rendez-vous avec l'ID ${id}:`, error);
    throw error; // Rejeter l'erreur pour la gestion dans le hook
  }
};


// 🚀 Afficher l'historique des rendez-vous d'un patient
export const fetchPatientHistory = async () => {
  try {
    const { data } = await axios.get("appointments/historique-patient", {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique des rendez-vous du patient:", error);
    throw error;
  }
};

// 🚀 Afficher l'historique des rendez-vous d'un médecin
export const fetchDoctorHistory = async () => {
  try {
    const { data } = await axios.get("appointments/historique-medecin", {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique des rendez-vous du médecin:", error);
    throw error;
  }
};

// 🚀 Afficher les rendez-vous créés par le médecin d'un patient
export const fetchAppointmentsByDoctor = async () => {
  try {
    const { data } = await axios.get("appointments/by-doctor", {
      headers: authHeader() // Ajout de l'authHeader ici si besoin
    });
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous du médecin:", error);
    throw error;
  }
};

// 🚀 Afficher la liste des rendez-vous acceptés
export const fetchAcceptedAppointments = async () => {
  try {
    const { data } = await axios.get("appointments/accepted", {
      headers: authHeader()
    });
    return data.data; // Extraction du tableau de données
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;
    console.error("Erreur acceptés:", message);
    throw new Error(message);
  }
};

// 🚀 Afficher la liste des rendez-vous refusés
export const fetchRejectedAppointments = async () => {
  try {
    const { data } = await axios.get("appointments/rejected", {
      headers: authHeader()
    });
    return data.data; // Extraction du tableau de données
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;
    console.error("Erreur refusés:", message);
    throw new Error(message);
  }
};

// Service API pour récupérer les demandes de participation
export const fetchParticipationRequests = async () => {
  try {
    const { data } = await axios.get('appointments/requests', {
      headers: authHeader() // Ajout du token d'authentification
    });
    return data.data; // La donnée propre à partir de la réponse (data.data)
  } catch (error) {
    // Extraction du message d'erreur avec une gestion robuste
    const message = error.response?.data?.error?.userMessage || error.message;
    throw new Error(message); // Lancer l'erreur pour la gestion dans le hook
  }
};

// Service API pour récupérer les rendez-vous acceptés aujourd'hui
export const fetchAcceptedAppointmentsToday = async () => {
  try {
    const { data } = await axios.get('appointments/accepted-today', {
      headers: authHeader() // Ajout du token d'authentification
    });
    return data.data; // Retour des rendez-vous acceptés aujourd'hui
  } catch (error) {
    const message = error.response?.data?.error?.userMessage || error.message;
    throw new Error(message); // Lancer l'erreur pour la gestion dans le hook
  }
};


// 🚀 Récupérer un rendez-vous spécifique par son ID (Version Frontend)
export const fetchAppointmentById = async (id) => {
  try {
    // Validation simplifiée pour le frontend
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    if (!isValidObjectId) {
      throw new Error('Format ID invalide');
    }
    
    const { data } = await axios.get(`appointments/${id}`, {
      headers: authHeader()
    });
    
    return {
      ...data.data,
      createdDate: new Date(data.data.createdAt)
    };
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;
    console.error(`Erreur ID ${id}:`, message);
    throw new Error(message);
  }
};