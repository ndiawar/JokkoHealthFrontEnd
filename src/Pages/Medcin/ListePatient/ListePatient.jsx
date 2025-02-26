import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import DataPatient from './DataPatient';

const ListePatient = () => {

  return (
    <Fragment>
      <Breadcrumbs parent="Patient" title="Liste des Patients" mainTitle="Liste des Patients" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <DataPatient />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

};

export default ListePatient;