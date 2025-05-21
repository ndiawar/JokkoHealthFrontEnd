import React, { useContext } from 'react';
import { H4 } from '../../../AbstractElements';
import CarToon from '../../../assets/images/Jokko/medecin.svg';
import { Card, CardBody, Col, Row } from 'reactstrap';
import UserContext from '../../../_helper/UserContext';

const GreetingPatient = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <H4 attrH4={{ className: 'f-w-600 mb-3', style: { textAlign: 'left' } }}>
        Bonjour <span style={{ color: '#409D9B' }}>{user?.prenom || 'Patient'}!</span>
      </H4>
      <Card className='profile-box' style={{ position: 'relative', overflow: 'visible' }}>
        <CardBody style={{ padding: '20px 30px', position: 'relative' }}>
          <Row>
            <Col xs="8">
              <div className='text-white greeting-user'>
                <H4 attrH4={{ className: 'f-w-600' }}>Bienvenue sur Jokko Health ! 💙</H4>
                <H4>Suivez votre santé en temps réel et restez en contact avec votre médecin.</H4>
              </div>
            </Col>
            <Col xs="4" className='d-flex justify-content-end align-items-end' style={{ position: 'relative' }}>
              <img
                src={CarToon}
                alt='Médecin'
                style={{
                  width: '95%',
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
    </div>
  );
};

export default GreetingPatient;