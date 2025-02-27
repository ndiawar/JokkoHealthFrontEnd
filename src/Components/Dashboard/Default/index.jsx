import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import GreetingCard from "./GreetingCard";
import ActivityCard from "./ActivityCard";
import Schedule from "../../../Pages/Medcin/ScheduleMedcin/Schedule";
import ChartRendezVous from "../../../Pages/Medcin/ChartRendezVous/ChartRendezVous";



const Dashboard = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Default" parent="Dashboard" title="Default" />
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard />
          <Schedule />
          <ActivityCard />
          <ChartRendezVous />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
