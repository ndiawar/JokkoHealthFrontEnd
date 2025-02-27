import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Card, ListGroup, Form } from 'react-bootstrap';
import { BsCircle } from 'react-icons/bs';
import './Dashboard.css';

moment.locale('fr');
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    {
      title: 'Nurse Visit 20',
      start: new Date(2025, 1, 26, 8, 30),
      end: new Date(2025, 1, 26, 10, 30),
      doctor: 'Dr. Carol D. Pollack-rundle'
    },
    {
      title: 'Routine Check-up',
      start: new Date(2025, 1, 27, 9, 0),
      end: new Date(2025, 1, 27, 11, 0),
      doctor: 'Dr. Emily R. Blake'
    },
    {
      title: 'Surgical Consultation',
      start: new Date(2025, 2, 3, 14, 0),
      end: new Date(2025, 2, 3, 15, 0),
      doctor: 'Dr. Jason M. Edwards'
    },
    {
      title: 'Physical Therapy Session',
      start: new Date(2025, 2, 4, 10, 30),
      end: new Date(2025, 2, 4, 12, 0),
      doctor: 'Dr. Rachel J. Martin'
    },
    {
      title: 'Dental Appointment',
      start: new Date(2025, 2, 5, 13, 0),
      end: new Date(2025, 2, 5, 14, 0),
      doctor: 'Dr. Megan T. Leclair'
    },
    {
      title: 'Eye Check-up',
      start: new Date(2025, 2, 6, 11, 15),
      end: new Date(2025, 2, 6, 12, 15),
      doctor: 'Dr. Henry K. Sanders'
    },
    {
      title: 'Cardiology Consultation',
      start: new Date(2025, 2, 7, 15, 0),
      end: new Date(2025, 2, 7, 16, 30),
      doctor: 'Dr. Sarah M. Evans'
    },
    {
      title: 'Psychiatric Follow-up',
      start: new Date(2025, 2, 8, 16, 0),
      end: new Date(2025, 2, 8, 17, 0),
      doctor: 'Dr. Christopher B. Hines'
    },
    {
      title: 'Orthopedic Consultation',
      start: new Date(2025, 2, 10, 14, 0),
      end: new Date(2025, 2, 10, 15, 30),
      doctor: 'Dr. Laura K. Smith'
    },
    {
      title: 'Emergency Room Visit',
      start: new Date(2025, 2, 12, 19, 0),
      end: new Date(2025, 2, 12, 21, 0),
      doctor: 'Dr. Alan F. White'
    },
    {
      title: 'Neurological Exam',
      start: new Date(2025, 2, 15, 9, 30),
      end: new Date(2025, 2, 15, 11, 0),
      doctor: 'Dr. Olivia P. Roberts'
    },
    {
      title: 'Cancer Treatment Appointment',
      start: new Date(2025, 2, 16, 10, 0),
      end: new Date(2025, 2, 16, 12, 0),
      doctor: 'Dr. David M. Phillips'
    },
    {
      title: 'Ultrasound Appointment',
      start: new Date(2025, 2, 17, 13, 30),
      end: new Date(2025, 2, 17, 14, 30),
      doctor: 'Dr. Mary J. O’Connor'
    },
    {
      title: 'Health Screening',
      start: new Date(2025, 2, 18, 8, 30),
      end: new Date(2025, 2, 18, 10, 0),
      doctor: 'Dr. James S. Lee'
    },
    {
      title: 'Maternity Follow-up',
      start: new Date(2025, 2, 20, 9, 0),
      end: new Date(2025, 2, 20, 10, 30),
      doctor: 'Dr. Stephanie T. Hayes'
    },
    {
      title: 'Vaccination Appointment',
      start: new Date(2025, 2, 21, 11, 0),
      end: new Date(2025, 2, 21, 12, 0),
      doctor: 'Dr. Linda F. Russo'
    },
    {
      title: 'Endocrinology Check-up',
      start: new Date(2025, 2, 22, 14, 0),
      end: new Date(2025, 2, 22, 15, 0),
      doctor: 'Dr. Timothy G. Kelly'
    },
    {
      title: 'Chiropractic Session',
      start: new Date(2025, 2, 23, 9, 0),
      end: new Date(2025, 2, 23, 10, 30),
      doctor: 'Dr. Olivia M. Wright'
    },
    {
      title: 'Pediatric Check-up',
      start: new Date(2025, 2, 25, 8, 30),
      end: new Date(2025, 2, 25, 10, 0),
      doctor: 'Dr. Ryan P. Smith'
    },
    {
      title: 'Gastrointestinal Consult',
      start: new Date(2025, 2, 26, 13, 30),
      end: new Date(2025, 2, 26, 15, 0),
      doctor: 'Dr. Karen L. Parker'

    },

  ];

  const dayEvents = events.filter(event => 
    moment(event.start).isSame(selectedDate, 'day')
  );

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="custom-calendar"
          onSelectSlot={({ start }) => setSelectedDate(start)}
          selected={selectedDate}
          components={{
            header: ({ label }) => (
              <div className="calendar-header">
                {label}
              </div>
            ),
            event: ({ event }) => (
              <div className="calendar-event">
                {event.title}
              </div>
            ),
            dateCellWrapper: ({ children }) => (
              <div className="date-cell">
                {children}
              </div>
            )
          }}
          dayPropGetter={(date) => ({
            className: moment(date).isSame(new Date(), 'day') ? 'today-cell' : ''
          })}
        />
      </div>

      <Card className="appointments-card">
        <Card.Header className="appointments-header">
          Prochain rendez-vous
        </Card.Header>
        <ListGroup variant="flush">
          {dayEvents.map((event, index) => (
            <ListGroup.Item key={index} className="appointment-item">
              <Form.Check type="checkbox" label="" className="me-2" />
              <div className="appointment-details">
                <div className="time-slot">
                  <BsCircle className="time-icon" />
                  <span>
                    Today, {moment(event.start).format('HH[h]mm')} - {moment(event.end).format('HH[h]mm')}
                  </span>
                </div>
                <div className="appointment-info">
                  {event.title}
                  <small>{event.doctor}</small>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default CalendarComponent;