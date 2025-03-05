import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { getAppointments, updateDemandeStatut } from '../../../api/appointment';

const AppointmentCard = () => {
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]); // État pour les rendez-vous acceptés
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/me', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setDoctorId(response.data._id);
      } catch (err) {
        console.error('Erreur lors de la récupération des informations utilisateur:', err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!doctorId) return; // Assurer que doctorId est défini avant d'exécuter la requête
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        console.log('Rendez-vous reçus:', data);  // Vérifiez la structure ici

        const filteredAppointments = data.filter(appointment =>
          appointment.doctorId._id === doctorId && appointment.demandeParticipe === true
        );

        setAppointments(filteredAppointments);
      } catch (error) {
        setError('Impossible de récupérer les rendez-vous.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleUpdateStatut = async (statut, appointmentId) => {
    try {
      const updatedRequest = await updateDemandeStatut(appointmentId, statut);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? updatedRequest : appointment
        )
      );

      // Si le statut est accepté, ajoutez le rendez-vous aux rendez-vous acceptés
      if (statut === 'accepté') {
        const acceptedAppointment = appointments.find(appointment => appointment._id === appointmentId);
        setAcceptedAppointments((prevAccepted) => [...prevAccepted, acceptedAppointment]);
        console.log('Demande acceptée:', updatedRequest);
      }

      console.log('Demande mise à jour:', updatedRequest);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  if (loading) return <p>Chargement des rendez-vous...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="row">
        {/* Carte des demandes de rendez-vous */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5>Demandes de rendez-vous ({appointments.length})</h5>
            </div>
            <div className="card-body">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="d-flex align-items-center mb-3 p-2 border rounded">
                  <div className="flex-grow-1">
                    <h6 className="mb-1">
                      {appointment.patientId && appointment.patientId.nom && appointment.patientId.prenom &&
                        `${appointment.patientId.nom} ${appointment.patientId.prenom}`}
                    </h6>
                    <small className="text-muted d-block">Date: {new Date(appointment.date).toLocaleDateString()}</small>
                    <small className="text-muted d-block">Heure: {appointment.heure_debut} - {appointment.heure_fin}</small>
                  </div>
                  <div className="ms-auto d-flex gap-2">
                    <button className="btn btn-success btn-sm" onClick={() => handleUpdateStatut('accepté', appointment._id)}>
                      <FaCheck /> Accepter
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleUpdateStatut('rejeté', appointment._id)}>
                      <FaTimes /> Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carte des rendez-vous confirmés */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5>Rendez-vous confirmés ({acceptedAppointments.length})</h5>
            </div>
            <div className="card-body">
              {acceptedAppointments.map((appointment) => (
                <div key={appointment._id} className="mb-3 p-3 border rounded">
                  <h6>
                    {appointment.patientId && appointment.patientId.nom && appointment.patientId.prenom &&
                      `${appointment.patientId.nom} ${appointment.patientId.prenom}`}
                  </h6>
                  <p className="text-muted">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                  <p className="text-muted">Heure: {appointment.heure_debut} - {appointment.heure_fin}</p>
                  <p className="text-success">Statut: Accepté</p>
                  <p className="text-success">Message: Votre rendez-vous a été confirmé avec succès.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;