import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getPendingAppointmentRequests, updateDemandeStatut } from '../../../api/ApiRendezVous'; // Import des fonctions

const PendingAppointments = ({ currentPage, setCurrentPage, appointmentsPerPage }) => {
  const [requests, setRequests] = useState([]);

  // Récupérer les demandes de rendez-vous
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getPendingAppointmentRequests();
        setRequests(response); // Assigner la réponse aux données d'état
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
      }
    };

    fetchRequests();
  }, []);

  // Fonction pour mettre à jour le statut d'une demande
  const handleRequestManagement = async (appointmentId, statutDemande) => {
    try {
      await updateDemandeStatut(appointmentId, statutDemande);  // Pas besoin de la variable 'response'
  
      toast.success(`Demande ${statutDemande} avec succès !`, {
        position: 'top-right',
        autoClose: 3000,
      });
  
      // Met à jour l'état local après la modification
      setRequests(requests.filter(request => request._id !== appointmentId)); // Retirer la demande traitée
    } catch (error) {
      console.error('Erreur lors de la gestion de la demande:', error);
      toast.error('Erreur lors de la gestion de la demande.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Fonction de pagination
  const paginate = (items, currentPage) => {
    const startIndex = currentPage * appointmentsPerPage;
    return items.slice(startIndex, startIndex + appointmentsPerPage);
  };

  const paginatedRequests = paginate(requests, currentPage);

  return (
    <div className="">
      <div className="card">
        <div className="card-header">
          <h5>Demandes de rendez-vous ({requests.length})</h5>
        </div>
        <div className="card-body">
          {paginatedRequests.length > 0 ? (
            paginatedRequests.map((request) => (
              <div key={request._id} className="d-flex align-items-center mb-3 p-2 border rounded">
                <div className="flex-grow-1">
                  <h6 className="mb-1">{request.patientId?.nom} {request.patientId?.prenom}</h6>
                  <small className="text-muted d-block">
                    Date: {new Date(request.date).toLocaleDateString()}
                  </small>
                  <small className="text-muted d-block">
                    Heure: {request.heure_debut} - {request.heure_fin}
                  </small>
                  <small className="text-muted d-block">
                    Tél: {request.patientId?.telephone}
                  </small>
                  <small className="text-muted d-block">
                    Email: {request.patientId?.email}
                  </small>
                </div>
                <div className="ms-auto d-flex gap-2">
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => handleRequestManagement(request._id, 'accepté')}
                  >
                    <FaCheck /> Accepter
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRequestManagement(request._id, 'rejeté')}
                  >
                    <FaTimes /> Refuser
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">
              Aucune demande de rendez-vous en attente
            </div>
          )}
        </div>
        {requests.length > 0 && (
          <div className="card-footer d-flex justify-content-between align-items-center">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Précédent
            </button>
            <span>
              Page {currentPage + 1} sur {Math.ceil(requests.length / appointmentsPerPage)}
            </span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentPage(prev => 
                Math.min(prev + 1, Math.ceil(requests.length / appointmentsPerPage) - 1)
              )}
              disabled={currentPage >= Math.ceil(requests.length / appointmentsPerPage) - 1}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingAppointments;
