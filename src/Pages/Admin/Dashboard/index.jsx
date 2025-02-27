import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import StatsCards from "./StatsCards";
import CalendarComponent from "./CalendrierRv";
import PatientOverview from "./VuePatient";
import DataPatient from "./DataPatient";

const DashboardAdmin = () => {
    return (
      <Fragment>
        <Breadcrumbs mainTitle="Administrateur" parent="Dashboard" title="Administrateur" />
        <Container fluid={true}>
          <Row className="widget-grid">
            {/* Colonne 8 pour les statistiques */}
            <div className="col-12 col-xxl-8">
              <StatsCards />
              <PatientOverview />
              <DataPatient />
            </div>
            
            {/* Colonne 4 pour le calendrier */}
            <div className="col-12 col-xxl-4 mt-4 mt-xxl-0">
              <CalendarComponent />
            </div>
          </Row>
        </Container>
      </Fragment>
    );
  };

export default DashboardAdmin;
