import React, { useState, useEffect } from 'react';
import { getAcceptedAppointmentRequests } from '../../../api/ApiRendezVous';
import { Spinner } from 'reactstrap';
import { FaCalendarCheck, FaClock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const AcceptedAppointmentsToday = ({ currentPageToday, setCurrentPageToday }) => {
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les rendez-vous acceptés
  const fetchAcceptedAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAcceptedAppointmentRequests();
      
      // Filtrer les rendez-vous pour aujourd'hui
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const todayAppointments = response.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate.getTime() === today.getTime() && 
               appointment.statutDemande === 'accepté' &&
               appointment.demandeParticipe === true;
      });

      // Trier les rendez-vous par heure
      const sortedAppointments = todayAppointments.sort((a, b) => {
        const timeA = a.heure_debut.split(':').map(Number);
        const timeB = b.heure_debut.split(':').map(Number);
        return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
      });

      setAcceptedAppointments(sortedAppointments);
      setError(null);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous acceptés:', error);
      setError('Impossible de charger les rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  // Effet pour charger les rendez-vous et les actualiser
  useEffect(() => {
    fetchAcceptedAppointments();
    // Actualiser toutes les 30 secondes
    const interval = setInterval(fetchAcceptedAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fonction pour obtenir le rendez-vous actuel
  const currentAppointment = acceptedAppointments[currentPageToday] || null;

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <Spinner color="primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <FaCalendarCheck className="me-2" />
          Rendez-vous acceptés du jour
          <span className="badge bg-primary ms-2">{acceptedAppointments.length}</span>
        </h5>
      </div>
      <div className="card-body">
        {currentAppointment ? (
          <div className="appointment-card mb-3 p-3 border rounded bg-light">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="patient-info">
                <h6 className="mb-1">
                  <FaUser className="me-2" />
                  {currentAppointment.patientId?.nom} {currentAppointment.patientId?.prenom}
                </h6>
                <div className="text-muted small">
                  <p className="mb-1">
                    <FaClock className="me-2" />
                    {currentAppointment.heure_debut} - {currentAppointment.heure_fin}
                  </p>
                  <p className="mb-1">
                    <FaPhone className="me-2" />
                    {currentAppointment.patientId?.telephone}
                  </p>
                  <p className="mb-1">
                    <FaEnvelope className="me-2" />
                    {currentAppointment.patientId?.email}
                  </p>
                </div>
              </div>
              <span className="badge bg-success">Confirmé</span>
            </div>
            {currentAppointment.specialiste && (
              <div className="speciality mt-2">
                <span className="badge bg-info">{currentAppointment.specialiste}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <FaCalendarCheck size={40} className="text-muted mb-3" />
            <p className="text-muted">Aucun rendez-vous pour aujourd'hui</p>
          </div>
        )}
      </div>

      {acceptedAppointments.length > 0 && (
        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setCurrentPageToday(prev => Math.max(prev - 1, 0))}
            disabled={currentPageToday === 0}
          >
            Précédent
          </button>
          <span className="text-muted">
            Rendez-vous {currentPageToday + 1} sur {acceptedAppointments.length}
          </span>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setCurrentPageToday(prev => 
              Math.min(prev + 1, acceptedAppointments.length - 1)
            )}
            disabled={currentPageToday >= acceptedAppointments.length - 1}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default AcceptedAppointmentsToday;
