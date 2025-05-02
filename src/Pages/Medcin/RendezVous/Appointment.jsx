import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaClock, FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getPendingAppointmentRequests, handleAppointmentRequest } from '../../../api/ApiRendezVous';
import { Card, CardHeader, CardBody, Badge, Spinner } from 'reactstrap';
import './RendezVous.css';

const PendingAppointments = ({ currentPage, setCurrentPage }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Récupérer les demandes de rendez-vous avec actualisation périodique
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getPendingAppointmentRequests();
        // Filtrer les rendez-vous pour ne garder que ceux à venir
        const futureRequests = response.filter(request => {
          const appointmentDate = new Date(request.date);
          const today = new Date();
          // On compare la date du rendez-vous avec aujourd'hui
          return appointmentDate >= today;
        });
        setRequests(futureRequests);
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        toast.error('Erreur lors de la récupération des demandes');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fonction pour mettre à jour le statut d'une demande
  const handleRequestManagement = async (appointmentId, statutDemande) => {
    if (processing) return;
    
    setProcessing(true);
    try {
      const request = requests.find(r => r._id === appointmentId);
      if (!request) {
        throw new Error('Demande non trouvée');
      }

      // Vérification et extraction du patientId
      let patientId;
      if (request.patientId) {
        if (typeof request.patientId === 'object' && request.patientId._id) {
          patientId = request.patientId._id;
        } else if (typeof request.patientId === 'string') {
          patientId = request.patientId;
        } else {
          throw new Error('Format de patientId invalide');
        }
      } else {
        throw new Error('Patient non trouvé pour cette demande');
      }

      await handleAppointmentRequest(appointmentId, statutDemande, patientId);
      
      // Mise à jour optimiste de l'interface
      setRequests(prevRequests => prevRequests.filter(req => req._id !== appointmentId));
      
      toast.success(`Demande ${statutDemande === 'accepté' ? 'acceptée' : 'refusée'} avec succès !`);
    } catch (error) {
      console.error('Erreur lors de la gestion de la demande:', error);
      // Afficher le message d'erreur spécifique du backend s'il existe
      const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la gestion de la demande';
      toast.error(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  // Obtenir la demande actuelle
  const currentRequest = requests[currentPage] || null;

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-white">
        <h5 className="mb-0">
          <FaClock className="me-2" />
          Demandes de rendez-vous
          <Badge color="primary" className="ms-2">
            {requests.length}
          </Badge>
        </h5>
      </CardHeader>
      <CardBody>
        {currentRequest ? (
          <div className="appointment-request-card">
            <div className="request-header">
              <div className="patient-info">
                <div className="patient-main-info">
                  <h6 className="mb-1">
                    <FaUser className="me-2" />
                    {currentRequest.patientId?.nom} {currentRequest.patientId?.prenom}
                  </h6>
                  <Badge color="info" className="ms-2">
                    Patient
                  </Badge>
                </div>
                <div className="contact-info">
                  <div className="contact-item">
                    <FaPhone className="me-2" />
                    <span>{currentRequest.patientId?.telephone || 'Non renseigné'}</span>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="me-2" />
                    <span>{currentRequest.patientId?.email || 'Non renseigné'}</span>
                  </div>
                  <div className="contact-item">
                    <FaBirthdayCake className="me-2" />
                    <span>{currentRequest.patientId?.dateDeNaissance ? new Date(currentRequest.patientId.dateDeNaissance).toLocaleDateString('fr-FR') : 'Non renseigné'}</span>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt className="me-2" />
                    <span>{currentRequest.patientId?.adresse || 'Non renseigné'}</span>
                  </div>
                </div>
              </div>
              <div className="request-status">
                <Badge color="warning">En attente</Badge>
              </div>
            </div>
            
            <div className="request-details">
              <div className="date-time">
                <FaCalendarAlt className="me-2" />
                <span>{new Date(currentRequest.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span className="mx-2">|</span>
                <span>{currentRequest.heure_debut} - {currentRequest.heure_fin}</span>
              </div>
              <div className="specialist">
                <span className="badge bg-info">{currentRequest.specialiste}</span>
              </div>
            </div>

            <div className="request-actions">
              <button 
                className="btn btn-success btn-sm me-2"
                onClick={() => handleRequestManagement(currentRequest._id, 'accepté')}
                disabled={processing}
              >
                <FaCheck /> Accepter
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleRequestManagement(currentRequest._id, 'refusé')}
                disabled={processing}
              >
                <FaTimes /> Refuser
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <FaClock size={48} className="mb-3" />
            <p>Aucune demande de rendez-vous en attente</p>
          </div>
        )}

        {requests.length > 0 && (
          <div className="pagination-controls mt-4">
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <span className="page-info">
              Demande {currentPage + 1} sur {requests.length}
            </span>
            <button
              className="btn btn-outline-primary btn-sm ms-2"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, requests.length - 1))}
              disabled={currentPage >= requests.length - 1}
            >
              Suivant
            </button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default PendingAppointments;
