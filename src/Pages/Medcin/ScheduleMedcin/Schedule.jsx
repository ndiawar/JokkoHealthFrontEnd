import React, { useState, useEffect } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { fr } from 'date-fns/locale';
import { Row, Col, Button } from "reactstrap";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Schedule.css";

const Schedule = () => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 });
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const [selectedDay, setSelectedDay] = useState(format(today, "EEE", { locale: fr }));
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/rendezvous/tous');
        const appointments = response.data;

        const formattedEvents = appointments.map(appointment => {
          const startDate = new Date(appointment.date);
          const endDate = new Date(startDate);

          const [endHour, endMinute] = appointment.heure_fin.split(':');
          endDate.setHours(parseInt(endHour, 10), parseInt(endMinute, 10));

          return {
            day: format(startDate, "EEE", { locale: fr }),
            time: `${appointment.heure_debut} - ${appointment.heure_fin}`,
            event: `Rendez-vous avec Dr. ${appointment.doctorId.nom} ${appointment.doctorId.prenom}`,
            type: "consultation",
            specialiste: appointment.specialiste,
            doctor: `Dr. ${appointment.doctorId.nom} ${appointment.doctorId.prenom}`,
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      }
    };

    fetchAppointments();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events
    .filter((event) => event.day === selectedDay)
    .slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(events.filter((event) => event.day === selectedDay).length / eventsPerPage);

  return (
    <Col md='6' className="p-0 mb-3">
      <div className="schedule container mt-4 p-3">
        <Row className="schedule-header mb-3">
          <Col xs={6} className="text-start">
            <p className="fs-5 mb-0">{format(today, "MMMM yyyy", { locale: fr })}</p>
          </Col>
          <Col xs={6} className="text-end">
            <p className="mb-0">Programme hebdomadaire</p>
          </Col>
        </Row>

        <Row className="schedule-days justify-content-between gx-1">
          {days.map((day, index) => {
            const date = addDays(startDate, index);
            return (
              <Col 
                key={index}
                xs={1}
                className={`schedule-day text-center p-2 ${
                  selectedDay === format(date, "EEE", { locale: fr }) ? "active" : ""
                }`}
                onClick={() => setSelectedDay(format(date, "EEE", { locale: fr }))}
              >
                <div className="day-abbr">{day}</div>
                <div className="day-number fw-medium">
                  {format(date, "d")}
                </div>
              </Col>
            );
          })}
        </Row>

        <Row className="schedule-timeline mt-4 g-2">
          {currentEvents.map((event, index) => (
            <Col xs={12} key={index}>
              <div className={`schedule-event ${event.type} p-3`}>
                <Row className="align-items-center">
                  <Col xs={3}>
                    <strong>{event.time}</strong>
                  </Col>
                  <Col xs={9}>
                    <p className="mb-0">{event.event}</p>
                    <p className="mb-0">Spécialité: {event.specialiste}</p>
                    <p className="mb-0">Médecin: {event.doctor}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>

        {totalPages > 1 && (
          <Row className="mt-3 justify-content-center">
            <Col xs="auto">
              <Button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="pagination-btn"
              >
                <FaChevronLeft />
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="pagination-btn"
              >
                <FaChevronRight />
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </Col>
  );
};

export default Schedule;