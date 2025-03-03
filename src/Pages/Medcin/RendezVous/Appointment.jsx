import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { 
  useParticipationRequests, 
  useAcceptedAppointmentsToday, 
  useManageRequest 
} from '../../../Hooks/JokkoHealth/useRendezVous';

const AppointmentCard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageToday, setCurrentPageToday] = useState(0);
  const appointmentsPerPage = 6;

  // Fonction de pagination (déplacée en haut)
  const paginate = (items, currentPage) => {
    const startIndex = currentPage * appointmentsPerPage;
    return items.slice(startIndex, startIndex + appointmentsPerPage);
  };

  // Récupérer les données via les hooks
  const { data: requests = [], isLoading: requestsLoading } = useParticipationRequests();
  const { data: acceptedAppointments = [], isLoading: acceptedLoading } = useAcceptedAppointmentsToday();
  const manageRequestMutation = useManageRequest();

  // Fonction pour gérer l'acceptation ou le rejet de la demande
  const handleRequestManagement = async (appointmentId, status) => {
    try {
      await manageRequestMutation.mutateAsync({
        id: appointmentId,
        statutDemande: status
      });
    } catch (error) {
      console.error('Erreur lors de la gestion de la demande:', error);
    }
  };

  // Filtrer les rendez-vous pour aujourd'hui
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = acceptedAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
    return appointmentDate === today;
  });

  // Appliquer la pagination
  const paginatedRequests = paginate(requests, currentPage);
  const paginatedTodayAppointments = paginate(todayAppointments, currentPageToday);

  if (requestsLoading || acceptedLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {/* Liste des demandes de rendez-vous */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5>Demandes de rendez-vous ({requests.length})</h5>
            </div>
            <div className="card-body">
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((request) => (
                  <div key={request._id} className="d-flex align-items-center mb-3 p-2 border rounded">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{request.patient?.nom} {request.patient?.prenom}</h6>
                      <small className="text-muted d-block">
                        Date: {new Date(request.date).toLocaleDateString()}
                      </small>
                      <small className="text-muted d-block">
                        Heure: {request.heure_debut} - {request.heure_fin}
                      </small>
                      <small className="text-muted d-block">
                        Tél: {request.patient?.telephone}
                      </small>
                      <small className="text-muted d-block">
                        Email: {request.patient?.email}
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

        {/* Rendez-vous acceptés du jour */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5>Rendez-vous acceptés du jour ({todayAppointments.length})</h5>
            </div>
            <div className="card-body">
              {paginatedTodayAppointments.length > 0 ? (
                paginatedTodayAppointments.map((appointment) => (
                  <div key={appointment._id} className="d-flex align-items-center mb-2 p-2 border rounded">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">
                        {appointment.patient?.nom} {appointment.patient?.prenom}
                      </h6>
                      <small className="text-muted d-block">
                        {new Date(appointment.date).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </small>
                      <small className="text-muted d-block">
                        {appointment.specialiste}
                      </small>
                    </div>
                    <span className="badge bg-success">Confirmé</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted">
                  Aucun rendez-vous pour aujourd'hui
                </div>
              )}
            </div>
            {todayAppointments.length > 0 && (
              <div className="card-footer d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentPageToday(prev => Math.max(prev - 1, 0))}
                  disabled={currentPageToday === 0}
                >
                  Précédent
                </button>
                <span>
                  Page {currentPageToday + 1} sur {Math.ceil(todayAppointments.length / appointmentsPerPage)}
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentPageToday(prev => 
                    Math.min(prev + 1, Math.ceil(todayAppointments.length / appointmentsPerPage) - 1)
                  )}
                  disabled={currentPageToday >= Math.ceil(todayAppointments.length / appointmentsPerPage) - 1}
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;