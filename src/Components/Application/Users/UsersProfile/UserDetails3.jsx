import React, { Fragment, useState, useEffect } from 'react';
import { Card, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FaLock } from 'react-icons/fa'; // Importer l'icône de cadenas
import axios from 'axios';
import Swal from 'sweetalert2'; // Importer SweetAlert2

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

    const [errors, setErrors] = useState({
        oldPasswordError: '',
        newPasswordError: '',
        confirmPasswordError: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('users/me');
                const userData = response.data;
                console.log('Données reçues de l\'API :', userData); // Log des données reçues
                setProfile({
                    id: userData._id, // Utilisez userData._id au lieu de userData.id
                    nom: userData.nom,
                    prenom: userData.prenom,
                    email: userData.email,
                    telephone: userData.telephone
                });
            } catch (error) {
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

        // Réinitialiser les messages d'erreur lors de la modification des champs
        setErrors((prevErrors) => ({
            ...prevErrors,
            [`${name}Error`]: ''
        }));
    };

    const validatePassword = (password) => {
        const minLength = 6;
        return password.length >= minLength;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Réinitialiser les erreurs
      setErrors({
          oldPasswordError: '',
          newPasswordError: '',
          confirmPasswordError: ''
      });
    
      let isValid = true;
    
      // Validation de l'ancien mot de passe
      if (!passwords.oldPassword) {
          setErrors((prevErrors) => ({
              ...prevErrors,
              oldPasswordError: 'L\'ancien mot de passe est requis.'
          }));
          isValid = false;
      }
    
      // Validation du nouveau mot de passe
      if (!passwords.newPassword) {
          setErrors((prevErrors) => ({
              ...prevErrors,
              newPasswordError: 'Le nouveau mot de passe est requis.'
          }));
          isValid = false;
      } else if (!validatePassword(passwords.newPassword)) {
          setErrors((prevErrors) => ({
              ...prevErrors,
              newPasswordError: 'Le nouveau mot de passe doit contenir au moins 6 caractères.'
          }));
          isValid = false;
      }
    
      // Validation de la confirmation du mot de passe
      if (!passwords.confirmPassword) {
          setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPasswordError: 'La confirmation du mot de passe est requise.'
          }));
          isValid = false;
      } else if (passwords.newPassword !== passwords.confirmPassword) {
          setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPasswordError: 'Les mots de passe ne correspondent pas.'
          }));
          isValid = false;
      }
    
      if (!isValid) {
          return; // Ne pas continuer si les validations échouent
      }
    
      try {
          const response = await axios.post(
              'auth/change-password',
              {
                  currentPassword: passwords.oldPassword,
                  newPassword: passwords.newPassword,
                  confirmPassword: passwords.confirmPassword
              },
              {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
              }
          );
    
          // Uniquement si la requête est réussie (status 200) et que les mots de passe sont corrects
          if (response.status === 200) {
              Swal.fire({
                  icon: 'success',
                  title: 'Succès',
                  text: response.data.message || 'Mot de passe modifié avec succès',
                  confirmButtonColor: '#12687B'
              }).then(() => {
                  // Vérifier si le message de succès contient "déconnecté"
                  if (response.data.message && response.data.message.includes("déconnecté")) {
                      localStorage.removeItem('token');
                      window.location.href = '/login';
                  }
                  // Sinon, rester sur la page actuelle
              });
          }
      } catch (error) {
          console.error('Erreur lors de la mise à jour du mot de passe :', error);
          
          if (error.response) {
              // Pas de redirection si l'ancien mot de passe est incorrect
              if (error.response.status === 401) {
                  setErrors((prevErrors) => ({
                      ...prevErrors,
                      oldPasswordError: "L'ancien mot de passe est incorrect."
                  }));
                  
                  Swal.fire({
                      icon: 'error',
                      title: 'Erreur',
                      text: "L'ancien mot de passe est incorrect.",
                      confirmButtonColor: '#12687B'
                  });
                  
                  return; // Pas de redirection
              } else if (error.response.status === 400) {
                  // Vérifier si l'erreur est liée au token ou à une autre validation
                  const errorMessage = error.response.data.message || 'Erreur de validation';
                  
                  // Vérifier si l'erreur est liée à la correspondance des mots de passe
                  if (errorMessage.toLowerCase().includes('ne correspondent pas')) {
                      setErrors((prevErrors) => ({
                          ...prevErrors,
                          confirmPasswordError: "Les mots de passe ne correspondent pas."
                      }));
                      
                      Swal.fire({
                          icon: 'error',
                          title: 'Erreur',
                          text: "Les mots de passe ne correspondent pas.",
                          confirmButtonColor: '#12687B'
                      });
                      
                      return; // Pas de redirection
                  } else if (errorMessage.toLowerCase().includes('token')) {
                      setErrors((prevErrors) => ({
                          ...prevErrors,
                          oldPasswordError: "Token manquant ou invalide."
                      }));
                      
                      Swal.fire({
                          icon: 'error',
                          title: 'Erreur',
                          text: "Token manquant ou invalide.",
                          confirmButtonColor: '#12687B'
                      });
                  } else {
                      setErrors((prevErrors) => ({
                          ...prevErrors,
                          oldPasswordError: errorMessage
                      }));
                      
                      Swal.fire({
                          icon: 'error',
                          title: 'Erreur',
                          text: errorMessage,
                          confirmButtonColor: '#12687B'
                      });
                  }
              } else {
                  // Autres erreurs HTTP
                  setErrors((prevErrors) => ({
                      ...prevErrors,
                      oldPasswordError: error.response.data.message || 'Erreur lors de la mise à jour du mot de passe.'
                  }));
                  
                  Swal.fire({
                      icon: 'error',
                      title: 'Erreur',
                      text: error.response.data.message || 'Erreur lors de la mise à jour du mot de passe.',
                      confirmButtonColor: '#12687B'
                  });
              }
          } else if (error.request) {
              // La requête a été faite mais pas de réponse reçue
              Swal.fire({
                  icon: 'error',
                  title: 'Erreur',
                  text: 'Aucune réponse reçue du serveur. Veuillez vérifier votre connexion.',
                  confirmButtonColor: '#12687B'
              });
          } else {
              // Une erreur s'est produite lors de la configuration de la requête
              Swal.fire({
                  icon: 'error',
                  title: 'Erreur',
                  text: 'Une erreur s\'est produite lors de la configuration de la requête.',
                  confirmButtonColor: '#12687B'
              });
          }
      }
    };
    if (loading) return <div>Chargement...</div>;

    return (
        <Fragment>
            <Card className="step5 d-flex flex-column h-100" data-intro="This is your profile" style={{ height: '400px', padding: '20px' }}>
                <div className="profile-img-style text-center flex-grow-1 d-flex flex-column align-items-center">
                    <h2 style={{ marginBottom: '10px' }}>Profil</h2>
                    <hr style={{ width: '80%', margin: '10px 0' }} />

                    <Row className="justify-content-center align-items-center mt-3" style={{ gap: '15px' }}>
                        <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '15px',
                                border: '2px solid #12687B',
                                padding: '15px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                width: '100%'
                            }}>
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
                                <div className="d-flex flex-column align-items-start">
                                    <p style={{ fontWeight: 'bold', marginBottom: '0' }}>{profile.nom} {profile.prenom}</p>
                                    <p style={{ color: 'gray', marginBottom: '0' }}>{profile.email}</p>
                                    <p style={{ color: 'gray', marginBottom: '0' }}>{profile.telephone}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <h5 className="mt-4 mb-3 text-center" style={{ color: '#12687B' }}>Modifier son mot de passe</h5>

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
                                {errors.oldPasswordError && <span style={{ color: 'red', fontSize: '0.9em' }}>{errors.oldPasswordError}</span>}
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
                                {errors.newPasswordError && <span style={{ color: 'red', fontSize: '0.9em' }}>{errors.newPasswordError}</span>}
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
                                {errors.confirmPasswordError && <span style={{ color: 'red', fontSize: '0.9em' }}>{errors.confirmPasswordError}</span>}
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