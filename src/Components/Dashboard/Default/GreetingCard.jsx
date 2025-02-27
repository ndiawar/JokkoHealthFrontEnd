import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { H4, P, H5, H6 } from '../../../AbstractElements';
import ProfilImage from '../../../assets/images/jokko/profil.png'; // Assurez-vous que ce chemin est correct

const GreetingCard = () => {
  return (
    <Col className='col-xxl-6 col-sm-6 box-col-6'>
      <div className='greeting-header mb-3'>
        <H4 attrH4={{ className: 'f-w-600' }}>Bonjour Dr. Diop!</H4>
      </div>
      <Card className='profile-box' style={{ position: 'relative', overflow: 'visible' }}>
        <CardBody style={{ padding: '20px 30px', position: 'relative' }}>
          <Row>
            <Col xs="8">
              <div className='visit-info'>
                <H5 className='mb-1'>Visites pour aujourd'hui</H5>
                <H4 className='mb-3'>2</H4>
                <div className='patient-cards d-flex'>
                  <Card className='patient-card me-1' style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', border: 'none' }}>
                    <CardBody className='p-2 d-flex justify-content-between align-items-center'>
                      <div>
                        <H6 className='mb-1 text-dark me-2'>Nouveaux Patients</H6>
                        <P className='mb-0'>15</P>
                      </div>
                      <div style={{ backgroundColor: 'rgba(0, 128, 0, 0.3)', padding: '5px 10px', borderRadius: '5px' }}>
                        <P className='mb-0 text-success ms-4'>5% ↑</P>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className='patient-card ms-1' style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', border: 'none' }}>
                    <CardBody className='p-4 d-flex justify-content-between align-items-center'>
                      <div>
                        <H6 className='mb-1 text-dark me-2'>Anciens Patients</H6>
                        <P className='mb-0'>20</P>
                      </div>
                      <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)', padding: '5px 10px', borderRadius: '5px' }}>
                        <P className='mb-0 text-danger ms-4'>20% ↓</P>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Col>
            <Col xs="4" className='d-flex justify-content-end align-items-end' style={{ position: 'relative' }}>
              <img
                src={ProfilImage}
                alt='Dr. Diop'
                style={{
                  width: '130%',
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
