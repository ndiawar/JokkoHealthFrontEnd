import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { P, H5, H6 } from '../../../AbstractElements';
import ProfilImage from '../../../assets/images/Jokko/medecin.svg';

const GreetingCard = () => {
  const [newPatientsCount, setNewPatientsCount] = useState(0);
  const [oldPatientsCount, setOldPatientsCount] = useState(0);

  // Récupérer les statistiques des patients avec Axios
  const fetchPatientStats = async () => {
    try {
      const response = await axios.get('/users/stats/patients');  // Utilisation d'Axios pour la requête GET
      const data = response.data;
      
      console.log('Response data:', data);  // Ajoutez ceci pour vérifier les données
  
      if (data.success) {
        setNewPatientsCount(data.newPatientsCount);
        setOldPatientsCount(data.oldPatientsCount);
      } else {
        console.error('Erreur lors de la récupération des statistiques');
      }
    } catch (error) {
      console.error('Erreur de communication avec l\'API', error);
    }
  };
  

  useEffect(() => {
    fetchPatientStats(); // Appel de la fonction dès le montage du composant
  }, []);

  return (
    <Col className="col-xxl-6 col-sm-6 box-col-6">
      {/* <div className="greeting-header mb-3">
        <H4 attrH4={{ className: 'f-w-600' }}>Bonjour Dr. Diop!</H4>
      </div> */}
      <Card className="profile-box" style={{ position: 'relative', overflow: 'visible' }}>
        <CardBody style={{ padding: '20px 30px', position: 'relative' }}>
          <Row>
            <Col xs="8">
              <div className="visit-info text-white">
                <H5 className="mb-1">Bienvenue sur Jokko Health, Docteur ! Consultez vos patients en un clic et assurez leur bien-être en temps réel. </H5>
                <div className="patient-cards d-flex text-white">
                  <Card className="patient-card me-1" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', border: 'none' }}>
                    <CardBody className="p-2 d-flex justify-content-between align-items-center">
                      <div>
                        <H6 className="mb-1 me-2">Nouveaux Patients</H6>
                        <P className="mb-0">{newPatientsCount}</P>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="patient-card ms-1" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', border: 'none' }}>
                    <CardBody className="p-4 d-flex justify-content-between align-items-center">
                      <div>
                        <H6 className="mb-1 me-2">Anciens Patients</H6>
                        <P className="mb-0">{oldPatientsCount}</P>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Col>
            <Col xs="4" className="d-flex justify-content-end align-items-end" style={{ position: 'relative' }}>
              <img
                src={ProfilImage}
                alt="Dr. Diop"
                style={{
                  width: '150%',
                  height: 'auto',
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  borderRadius: '15px',
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default GreetingCard;
