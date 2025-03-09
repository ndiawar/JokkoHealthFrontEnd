import React, { useState, useEffect } from 'react';
import { getAcceptedAppointmentsWithParticipation } from '../../../api/ApiRendezVous'; // Import de la fonction pour récupérer les rendez-vous

const AcceptedAppointmentsToday = ({ currentPageToday, setCurrentPageToday, appointmentsPerPage }) => {
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  // Récupérer les rendez-vous acceptés
  useEffect(() => {
    const fetchAcceptedAppointments = async () => {
      try {
        const response = await getAcceptedAppointmentsWithParticipation();
        setAcceptedAppointments(response); // Mettre à jour l'état avec les rendez-vous récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous acceptés:', error);
      }
    };

    fetchAcceptedAppointments();
  }, []); // Le tableau vide [] signifie que cette fonction sera appelée au montage du composant (une seule fois).

  // Filtrer les rendez-vous acceptés pour aujourd'hui
  const today = new Date().toISOString().split('T')[0]; // Récupère la date du jour au format 'YYYY-MM-DD'
  
  const todayAppointments = acceptedAppointments.filter(appointment => {
    // Comparer la date du rendez-vous avec la date d'aujourd'hui
    const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
    return appointmentDate === today;
  });

  // Fonction de pagination : découpe les rendez-vous en fonction de la page actuelle
  const paginate = (items, currentPageToday) => {
    const startIndex = currentPageToday * appointmentsPerPage;
    return items.slice(startIndex, startIndex + appointmentsPerPage);
  };

  const paginatedTodayAppointments = paginate(todayAppointments, currentPageToday); // Applique la pagination sur les rendez-vous d'aujourd'hui

  return (
    <div className="">
      <div className="card">
        <div className="card-header">
          <h5>Rendez-vous acceptés du jour ({todayAppointments.length})</h5>
        </div>
        <div className="card-body">
          {paginatedTodayAppointments.length > 0 ? (
            // Si des rendez-vous sont trouvés, les afficher
            paginatedTodayAppointments.map((appointment) => (
              <div key={appointment._id} className="d-flex align-items-center mb-2 p-2 border rounded">
                <div className="flex-grow-1">
                  <h6 className="mb-1">
                    {appointment.patientId?.nom} {appointment.patientId?.prenom}
                  </h6>
                  <small className="text-muted d-block">
                    {new Date(appointment.date).toLocaleDateString()} 
                    {` à ${new Date(appointment.heure_debut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  </small>
                  <small className="text-muted d-block">
                    {appointment.specialiste}
                  </small>
                  <small className="text-muted d-block">
                    Téléphone: {appointment.patientId?.telephone}
                  </small>
                  <small className="text-muted d-block">
                    Email: {appointment.patientId?.email}
                  </small>
                </div>
                <span className="badge bg-success">Confirmé</span>
              </div>
            ))
          ) : (
            // Si aucun rendez-vous n'est trouvé pour aujourd'hui
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
  );
};

export default AcceptedAppointmentsToday;
