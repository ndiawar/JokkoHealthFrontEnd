import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Card, ListGroup, Form } from 'react-bootstrap';
import { BsCircle } from 'react-icons/bs';
import { useFetchAppointments } from '../../../Hooks/JokkoHealth/useRendezVous'; // Import du hook pour récupérer les rendez-vous
import './Dashboard.css';

moment.locale('fr');
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: appointments, isLoading, isError } = useFetchAppointments();

  // Fonction pour mapper les rendez-vous dans le format attendu par le calendrier
  const events = appointments?.map((appointment) => ({
    title: `Rendez-vous ${appointment.specialiste}`,
    start: new Date(`${appointment.date}T${appointment.heure_debut}:00`),
    end: new Date(`${appointment.date}T${appointment.heure_fin}:00`),
    doctorId: appointment.doctorId?._id,
    status: appointment.statutDemande, // Statut de la demande (accepté, en attente, etc.)
    patient: `${appointment.patientId?.prenom} ${appointment.patientId?.nom}`,
  })) || [];

  // Filtrer les événements pour la date sélectionnée
  const dayEvents = events.filter((event) =>
    moment(event.start).isSame(selectedDate, 'day')
  );

  // Affichage des états de chargement et d'erreur
  if (isLoading) {
    return <div>Chargement des rendez-vous...</div>;
  }

  if (isError) {
    return <div>Erreur lors de la récupération des rendez-vous.</div>;
  }

  // Fonction pour gérer la sélection d'un événement
  const handleSelectEvent = (event) => {
    setSelectedDate(event.start); // Mettre à jour la date sélectionnée lors de la sélection d'un événement
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="custom-calendar"
          onSelectSlot={({ start }) => setSelectedDate(start)} // Permet de modifier la date sélectionnée sur le calendrier
          selected={selectedDate} // Propriété `selected` pour indiquer l'événement sélectionné
          onSelectEvent={handleSelectEvent} // Gestion de l'événement lors de la sélection d'un événement
          components={{
            header: ({ label }) => (
              <div className="calendar-header">
                {label}
              </div>
            ),
            event: ({ event }) => (
              <div className="calendar-event">
                {event.title} {/* Affiche juste le titre sans le nom du médecin */}
              </div>
            ),
            dateCellWrapper: ({ children }) => (
              <div className="date-cell">
                {children}
              </div>
            ),
          }}
          dayPropGetter={(date) => ({
            className: moment(date).isSame(new Date(), 'day') ? 'today-cell' : '',
          })}
        />
      </div>

      {/* Affichage des rendez-vous du jour sélectionné */}
      <Card className="appointments-card">
        <Card.Header className="appointments-header">
          Prochain rendez-vous
        </Card.Header>
        <ListGroup variant="flush">
          {dayEvents.length === 0 ? (
            <ListGroup.Item>Aucun rendez-vous pour aujourd'hui.</ListGroup.Item>
          ) : (
            dayEvents.map((event, index) => (
              <ListGroup.Item key={index} className="appointment-item">
                <Form.Check type="checkbox" label="" className="me-2" />
                <div className="appointment-details">
                  <div className="time-slot">
                    <BsCircle className="time-icon" />
                    <span>
                      {moment(event.start).format('HH[h]mm')} - {moment(event.end).format('HH[h]mm')}
                    </span>
                  </div>
                  <div className="appointment-info">
                    <strong>{event.title}</strong>
                    <small>Patient: {event.patient}</small>
                    <div
                      className={`appointment-status ${event.status.toLowerCase()}`}
                    >
                      {event.status === 'accepté' && '✅ Rendez-vous accepté'}
                      {event.status === 'en attente' && '⏳ En attente de confirmation'}
                      {event.status === 'rejeté' && '❌ Rendez-vous rejeté'}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default CalendarComponent;
