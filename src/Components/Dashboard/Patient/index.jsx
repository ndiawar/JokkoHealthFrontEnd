import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import GreetingPatient from "./GreetingPatient";
import CardDashboard from "./CardDashboard";
import ChartDashboard from "./ChartDashboard"; 
import Prescription from "./Prescription"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Patient = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Patient" parent="Dashboard" title="Patient" />
      <Container fluid={true}>
        <Row className="widget-grid">
          <Col md={6}>
            <GreetingPatient />
          </Col>
          <Col md={6}>
            <CardDashboard />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Prescription />
          </Col>
          <Col md={5}>
            <ChartDashboard />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Patient;