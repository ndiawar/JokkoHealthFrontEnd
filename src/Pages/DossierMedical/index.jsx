import React from 'react';
import { Breadcrumbs } from "../../AbstractElements"; // Importer Breadcrumbs
import EditMyProfile from './EditUser';
import ProfilUser from './ProfilUser';
import { Row, Col } from 'reactstrap';

function Medical() {
  return (
    <div className="container-fluid mt-4">
      <Breadcrumbs mainTitle="Dossier Médical" parent="Dashboard" title="Dossier Médical" /> {/* Ajouter Breadcrumbs */}
      <Row className="g-0">
        <Col xs="12" sm="4" md="3" className="p-3">
          <ProfilUser />
        </Col>
        <Col xs="12" sm="8" md="9" className="p-3">
          <EditMyProfile />
        </Col>
      </Row>
    </div>
  );
}

export default Medical;