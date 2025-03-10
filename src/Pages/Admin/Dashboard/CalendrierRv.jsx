import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'; // Import de Reactstrap

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/rendezvous/tous');
        const appointments = response.data;

        const formattedEvents = appointments.map(appointment => {
          const startDate = new Date(appointment.date);
          const endDate = new Date(startDate);

          const [endHour, endMinute] = appointment.heure_fin.split(':');
          endDate.setHours(parseInt(endHour, 10), parseInt(endMinute, 10)); // Fix end date hour

          return {
            title: `Rendez-vous avec ${appointment.doctorId.nom} ${appointment.doctorId.prenom}`,
            start: startDate, // start date is already an ISO string
            end: endDate, // end date is already an ISO string
            doctor: `${appointment.doctorId.nom} ${appointment.doctorId.prenom}`,
            specialiste: appointment.specialiste,
            heure_debut: appointment.heure_debut,
            heure_fin: appointment.heure_fin,
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      }
    };

    fetchAppointments();
  }, []);

  const today = new Date();
  const todayEvents = events.filter(event => new Date(event.start).toDateString() === today.toDateString());

  return (
    <div style={{ padding: '20px' }}>
      {/* Card pour le calendrier */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Calendrier des Rendez-vous</CardTitle>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale="fr"
          />
        </CardBody>
      </Card>

      {/* Card pour les prochains rendez-vous */}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Prochain rendez-vous</CardTitle>
          {todayEvents.length === 0 ? (
            <CardText>Aucun rendez-vous prévu pour aujourd’hui.</CardText>
          ) : (
            todayEvents.map((event, index) => (
              <Card key={index} className="mb-3">
                <CardBody>
                  <CardTitle tag="h6">{`Aujourd’hui, ${event.heure_debut} - ${event.heure_fin}`}</CardTitle>
                  <CardText><strong>{event.title}</strong></CardText>
                  <CardText>Spécialiste: {event.specialiste}</CardText>
                  <CardText>Docteur: {event.doctor}</CardText>
                </CardBody>
              </Card>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CalendarComponent;
