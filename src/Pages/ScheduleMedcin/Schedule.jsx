import React, { useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Schedule.css";

const Schedule = () => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Commence le lundi
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDay, setSelectedDay] = useState(format(today, "EEE")); // Jour actuel

  const events = [
    { day: "Mon", time: "11:00 - 12:00 AM", event: "Retinal detachment surgery", type: "surgery" },
    { day: "Mon", time: "2:00 - 3:00 PM", event: "Eye infection treatment", type: "treatment" },
    { day: "Mon", time: "2:00 - 3:00 PM", event: "3 Regular consultations", type: "consultation" },
    { day: "Thu", time: "11:00 - 12:00 AM", event: "Retinal detachment surgery", type: "surgery" },
  ];

  return (
    <div className="schedule container mt-4 p-3">
      <div className="schedule-header text-center mb-3">
        <h2>{format(today, "MMMM, yyyy")}</h2>
        <h4>Programme hebdomadaire</h4>
      </div>
      <div className="schedule-days d-flex justify-content-between">
        {days.map((day, index) => {
          const date = addDays(startDate, index);
          return (
            <div
              key={index}
              className={`schedule-day ${selectedDay === format(date, "EEE") ? "active" : ""}`}
              onClick={() => setSelectedDay(format(date, "EEE"))}
            >
              <span>{day}</span>
              <span className="day-number">{format(date, "d")}</span>
            </div>
          );
        })}
      </div>
      <div className="schedule-timeline mt-4">
        {events
          .filter((event) => event.day === selectedDay)
          .map((event, index) => (
            <div key={index} className={`schedule-event ${event.type} p-3`}>
              <strong>{event.time}</strong>
              <p>{event.event}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Schedule;
