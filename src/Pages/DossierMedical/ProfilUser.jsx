import React, { Fragment } from 'react';
import { Card, Row, Col } from 'reactstrap';

const ProfilUser = () => {
    const userTitle = "Profil";
    const userFooter = "Yaye Fatou Kane";
    const address = "Dakar, Sénégal";

    return (
        <Fragment>
            <Card className="step5 d-flex flex-column h-100" data-intro="This is your profile" style={{ height: '400px', padding: '20px' }}> 
                <div className="profile-img-style text-center flex-grow-1 d-flex flex-column align-items-center">
                    {/* Titre centré en haut */}
                    <h2 style={{ marginBottom: '10px' }}>{userTitle}</h2>
                    <hr style={{ width: '80%', margin: '10px 0' }} />

                    {/* Conteneur avec image et texte côte à côte */}
                    <Row className="justify-content-center align-items-center mt-3" style={{ gap: '15px' }}>
                        <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                            {/* Conteneur avec bordures arrondies et couleur de fond */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f0f0f0', // Couleur de fond
                                borderRadius: '15px', // Bordures arrondies
                                border: '2px solid #12687B', // Bordure colorée
                                padding: '15px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                width: '100%'
                            }}>
                                {/* Image */}
                                <div className="img-container" style={{ marginRight: '15px' }}>
                                    <a href="#javascript">
                                        <img
                                            src={require("../../assets/images/other-images/profile-style-img.png")}
                                            alt="Profile"
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid #fff',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                    </a>
                                </div>
                                {/* Texte avec nom et adresse côte à côte */}
                                <div className="d-flex flex-column align-items-start">
                                    <p style={{ fontWeight: 'bold', marginBottom: '0' }}>{userFooter}</p>
                                    <p style={{ color: 'gray', marginBottom: '0' }}>{address}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Fragment>
    );
}

export default ProfilUser;
