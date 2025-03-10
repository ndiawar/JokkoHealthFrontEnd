import React, { Fragment, useState } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import ResumeRendezVous from "./ResumeRendezVous";
import AjoutRendezVous from "./AjoutRendezVous";
// import AppointmentCard from "./Appointment";
import AcceptedAppointmentsToday from "./AppointmentAccepté";
import PendingAppointments from "./Appointment";


const RendezVous = () => {

  // Exemple d'utilisation du composant

  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageToday, setCurrentPageToday] = useState(0);
  const appointmentsPerPage = 6;
  
return (
  <>
    <Breadcrumbs mainTitle="Gestion Rendez-Vous" parent="RendezVous" title="Gestion Rendez-Vous" />
    <Container fluid={true}>
      <Row className="widget-grid">
        <ResumeRendezVous />
        <AjoutRendezVous />
      </Row>
      <Row className="widget-grid">
        <div className="col-md-6">
            {/* Liste des demandes de rendez-vous */}
            <PendingAppointments 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              appointmentsPerPage={appointmentsPerPage} 
            />
        </div>
        <div className="col-md-6">
            {/* Rendez-vous acceptés du jour */}
            <AcceptedAppointmentsToday 
              currentPageToday={currentPageToday} 
              setCurrentPageToday={setCurrentPageToday} 
              appointmentsPerPage={appointmentsPerPage} 
            />
        </div>
        
      </Row>
    </Container>
  </>
);

};

export default RendezVous;
