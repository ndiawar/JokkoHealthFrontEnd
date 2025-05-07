import React from 'react';
import { H4 } from '../../../AbstractElements';
import CarToon from '../../../assets/images/Jokko/medecin.svg';
import { Card, CardBody, Col, Row } from 'reactstrap';

const GreetingPatient = () => {
  return (
    <div>
        {/* Message de salutation personnalisé avec "Yaye Fatou" en couleur */}
        <H4 attrH4={{ className: 'f-w-600 mb-3', style: { textAlign: 'left' } }}>
          Bonjour <span style={{ color: '#409D9B' }}>Yaye Fatou!</span>
        </H4>
      <Card className='profile-box' style={{ position: 'relative', overflow: 'visible' }}>
        <CardBody style={{ padding: '20px 30px', position: 'relative' }}>
          <Row>
            <Col xs="8">
              <div className=' text-white greeting-user'>
                <H4 attrH4={{ className: 'f-w-600' }}>Bienvenue sur Jokko Health ! 💙</H4>
                <H4>Suivez votre santé en temps réel et restez en contact avec votre médecin.</H4>
              </div>
            </Col>
            <Col xs="4" className='d-flex justify-content-end align-items-end' style={{ position: 'relative' }}>
              <img
                src={CarToon}
                alt='Dr. Diop'
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