/*global require*/ 
import React, { Fragment, useState, useEffect } from 'react';
import { Card, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FaLock } from 'react-icons/fa'; // Importer l'icône de cadenas
import axios from 'axios';

const UserDetails3 = () => {
    const [profile, setProfile] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: ''
    });

    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('users/me');
                const userData = response.data;
                setProfile({
                    nom: userData.nom,
                    prenom: userData.prenom,
                    email: userData.email,
                    telephone: userData.telephone
                });
            } catch (error) {
                setError("Erreur lors de la récupération des données.");
                console.error('Erreur lors de la récupération des données :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword === passwords.confirmPassword) {
            alert("Mot de passe mis à jour avec succès !");
            // Logique pour mettre à jour le mot de passe
        } else {
            alert("Les mots de passe ne correspondent pas.");
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Fragment>
            <Card className="step5 d-flex flex-column h-100" data-intro="This is your profile" style={{ height: '400px', padding: '20px' }}>
                <div className="profile-img-style text-center flex-grow-1 d-flex flex-column align-items-center">
                    {/* Titre centré en haut */}
                    <h2 style={{ marginBottom: '10px' }}>Profil</h2>
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
                                            src={require("../../../../assets/images/other-images/profile-style-img.png")}
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
                                    <p style={{ fontWeight: 'bold', marginBottom: '0' }}>{profile.nom} {profile.prenom}</p>
                                    <p style={{ color: 'gray', marginBottom: '0' }}>{profile.email}</p>
                                    <p style={{ color: 'gray', marginBottom: '0' }}>{profile.telephone}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Titre pour la section de changement de mot de passe */}
                    <h5 className="mt-4 mb-3 text-center" style={{ color: '#12687B' }}>Modifier son mot de passe</h5>

                    {/* Formulaire de changement de mot de passe */}
                    <div style={{ marginTop: '20px' }}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Ancien mot de passe :</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type="password"
                                        name="oldPassword"
                                        value={passwords.oldPassword}
                                        onChange={handleChange}
                                        required
                                        style={{ paddingLeft: '30px' }}
                                    />
                                    <FaLock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#12687B' }} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Nouveau mot de passe :</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type="password"
                                        name="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handleChange}
                                        required
                                        style={{ paddingLeft: '30px' }}
                                    />
                                    <FaLock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#12687B' }} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirmer mot de passe :</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwords.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        style={{ paddingLeft: '30px' }}
                                    />
                                    <FaLock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#12687B' }} />
                                </div>
                            </FormGroup>
                            <Button type="submit" style={{ backgroundColor: '#12687B', borderColor: '#12687B' }}>
                                Changer le mot de passe
                            </Button>
                        </Form>
                    </div>
                </div>
            </Card>
        </Fragment>
    );
}

export default UserDetails3;
