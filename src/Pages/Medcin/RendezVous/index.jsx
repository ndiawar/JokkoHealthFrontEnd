import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import ResumeRendezVous from "./ResumeRendezVous";
import AjoutRendezVous from "./AjoutRendezVous";
import AppointmentCard from "./Appointment";

const RendezVous = () => {

  // Exemple d'utilisation du composant
const appointments = [
  { id: 1, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/1.jpg', status: 'confirmed' },
  { id: 2, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/2.jpg', status: 'confirmed' },
  { id: 3, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/3.jpg', status: 'confirmed' },
  { id: 4, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/4.jpg', status: 'confirmed' },
  { id: 5, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/5.jpg', status: 'confirmed' },
  { id: 6, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/6.jpg', status: 'confirmed' },
  { id: 7, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/7.jpg', status: 'confirmed' },
  { id: 8, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/8.jpg', status: 'confirmed' },
  { id: 9, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/9.jpg', status: 'confirmed' },
  { id: 10, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/10.jpg', status: 'confirmed' },
  { id: 11, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/11.jpg', status: 'confirmed' },
  { id: 12, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/12.jpg', status: 'confirmed' },
  { id: 13, name: 'Astou Diouf', date: '2025-01-15T09:30:00', avatar: '../../../assets/images/user/13.jpg', status: 'confirmed' },
];

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Default" parent="RendezVous" title="Default" />
      <Container fluid={true}>
        <Row className="widget-grid">
          <ResumeRendezVous />
          <AjoutRendezVous />
          <AppointmentCard appointments={appointments} />
        </Row>
      </Container>
    </Fragment>
  );
};

export default RendezVous;
