import React, { useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Schedule.css";

const Schedule = () => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 });
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDay, setSelectedDay] = useState(format(today, "EEE"));

  const events = [
    { day: "Mon", time: "11:00 - 12:00 AM", event: "Retinal detachment surgery", type: "surgery" },
    { day: "Mon", time: "2:00 - 3:00 PM", event: "Eye infection treatment", type: "treatment" },
    { day: "Mon", time: "2:00 - 3:00 PM", event: "3 Regular consultations", type: "consultation" },
    { day: "Thu", time: "11:00 - 12:00 AM", event: "Retinal detachment surgery", type: "surgery" },
  ];

  return (
    <Col md='6' className="p-0">
      <div className="schedule container mt-4 p-3">
        {/* Header */}
        <Row className="schedule-header mb-3">
          <Col xs={6} className="text-start">
            <p className="fs-5 mb-0">{format(today, "MMMM, yyyy")}</p>
          </Col>
          <Col xs={6} className="text-end">
            <p className="mb-0">Programme hebdomadaire</p>
          </Col>
        </Row>

        {/* Days Grid */}
        <Row className="schedule-days justify-content-between gx-1">
          {days.map((day, index) => {
            const date = addDays(startDate, index);
            return (
              <Col 
                key={index}
                xs={1}
                className={`schedule-day text-center p-2 ${
                  selectedDay === format(date, "EEE") ? "active" : ""
                }`}
                onClick={() => setSelectedDay(format(date, "EEE"))}
              >
                <div className="day-abbr">{day}</div>
                <div className="day-number fw-medium">
                  {format(date, "d")}
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Events Timeline */}
        <Row className="schedule-timeline mt-4 g-2">
          {events
            .filter((event) => event.day === selectedDay)
            .map((event, index) => (
              <Col xs={12} key={index}>
                <div className={`schedule-event ${event.type} p-3`}>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <strong>{event.time}</strong>
                    </Col>
                    <Col xs={9}>
                      <p className="mb-0">{event.event}</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </Col>
  );
};

export default Schedule;
