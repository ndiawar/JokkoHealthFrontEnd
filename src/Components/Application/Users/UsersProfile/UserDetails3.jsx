import React, { Fragment, useState, useEffect } from 'react';
import { Card, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { changePassword, verifyCurrentPassword } from '../../../../api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserDetails3 = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: ''
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValidatingCurrentPassword, setIsValidatingCurrentPassword] = useState(false);
    const [validationMessage, setValidationMessage] = useState({
        currentPassword: '',
        isValid: null
    });

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

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateCurrentPassword = async (password) => {
        if (!password) {
            setValidationMessage({
                currentPassword: "L'ancien mot de passe est requis",
                isValid: false
            });
            return false;
        }
        
        try {
            setIsValidatingCurrentPassword(true);
            const response = await verifyCurrentPassword(password);
            setValidationMessage({
                currentPassword: response.message,
                isValid: response.isValid
            });
            return response.isValid;
        } catch (error) {
            console.error('Erreur lors de la vérification du mot de passe actuel:', error);
            setValidationMessage({
                currentPassword: error.message || "Une erreur est survenue",
                isValid: false
            });
            return false;
        } finally {
            setIsValidatingCurrentPassword(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!passwords.currentPassword) {
            newErrors.currentPassword = "L'ancien mot de passe est requis";
            isValid = false;
        }

        if (!passwords.newPassword) {
            newErrors.newPassword = "Le nouveau mot de passe est requis";
            isValid = false;
        } else if (!validatePassword(passwords.newPassword)) {
            newErrors.newPassword = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";
            isValid = false;
        }

        if (!passwords.confirmPassword) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise";
            isValid = false;
        } else if (passwords.newPassword !== passwords.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));

        // Validation en temps réel
        const newErrors = { ...errors };
        switch (name) {
            case 'currentPassword':
                if (!value) {
                    newErrors.currentPassword = "L'ancien mot de passe est requis";
                } else {
                    const isValid = await validateCurrentPassword(value);
                    if (!isValid) {
                        // Ne pas afficher d'erreur en temps réel pour le mot de passe actuel
                        newErrors.currentPassword = "";
                    } else {
                        newErrors.currentPassword = "";
                    }
                }
                break;
            case 'newPassword':
                if (!value) {
                    newErrors.newPassword = "Le nouveau mot de passe est requis";
                } else if (!validatePassword(value)) {
                    newErrors.newPassword = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";
                } else {
                    newErrors.newPassword = "";
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    newErrors.confirmPassword = "La confirmation du mot de passe est requise";
                } else if (value !== passwords.newPassword) {
                    newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
                } else {
                    newErrors.confirmPassword = "";
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const startCountdown = () => {
        let seconds = 5;
        const toastId = toast.info(
            <div>
                <p>Mot de passe modifié avec succès !</p>
                <p>Vous serez déconnecté dans {seconds} secondes...</p>
            </div>,
            {
                autoClose: 5000,
                closeButton: false,
                closeOnClick: false,
                draggable: false,
                progress: undefined,
            }
        );

        const timer = setInterval(() => {
            seconds--;
            if (seconds > 0) {
                toast.update(toastId, {
                    render: (
                        <div>
                            <p>Mot de passe modifié avec succès !</p>
                            <p>Vous serez déconnecté dans {seconds} secondes...</p>
                        </div>
                    ),
                });
            } else {
                clearInterval(timer);
                localStorage.removeItem('token');
                navigate('/login');
            }
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Veuillez corriger les erreurs dans le formulaire");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await changePassword(
                passwords.currentPassword,
                passwords.newPassword,
                passwords.confirmPassword
            );

            if (result.success) {
                setPasswords({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                startCountdown();
            }
        } catch (error) {
            console.error('Erreur lors du changement de mot de passe:', error);
            
            // Gestion spécifique des erreurs
            if (error.response?.status === 401) {
                toast.error("L'ancien mot de passe est incorrect");
            } else if (error.response?.status === 400) {
                toast.error(error.response.data.message || "Données invalides");
            } else if (error.response?.status === 429) {
                toast.error("Trop de tentatives. Veuillez réessayer plus tard");
            } else {
                toast.error(error.message || "Une erreur est survenue lors du changement de mot de passe");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
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
                                        type={showPasswords.currentPassword ? "text" : "password"}
                                        name="currentPassword"
                                        value={passwords.currentPassword}
                                        onChange={handleChange}
                                        required
                                        style={{ paddingLeft: '30px', paddingRight: '40px' }}
                                        className={validationMessage.isValid === false ? 'is-invalid' : validationMessage.isValid === true ? 'is-valid' : ''}
                                        disabled={isValidatingCurrentPassword}
                                    />
                                    <FaLock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#12687B' }} />
                                    {isValidatingCurrentPassword && (
                                        <div style={{ 
                                            position: 'absolute', 
                                            right: '10px', 
                                            top: '50%', 
                                            transform: 'translateY(-50%)',
                                            color: '#12687B'
                                        }}>
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Chargement...</span>
                                            </div>
                                        </div>
                                    )}
                                    {!isValidatingCurrentPassword && (
                                        <div 
                                            style={{ 
                                                position: 'absolute', 
                                                right: '10px', 
                                                top: '50%', 
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                color: '#12687B'
                                            }}
                                            onClick={() => togglePasswordVisibility('currentPassword')}
                                        >
                                            {showPasswords.currentPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    )}
                                </div>
                                {validationMessage.currentPassword && (
                                    <div 
                                        className={`mt-1 ${validationMessage.isValid ? 'text-success' : 'text-danger'}`}
                                        style={{ fontSize: '0.875rem' }}
                                    >
                                        {validationMessage.currentPassword}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>Nouveau mot de passe :</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type={showPasswords.newPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handleChange}
                                        required
                                        style={{ paddingLeft: '30px', paddingRight: '40px' }}
                                        className={errors.newPassword ? 'is-invalid' : ''}
                                    />
                                    <FaLock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#12687B' }} />
                                    <div 
                                        style={{ 
                                            position: 'absolute', 
                                            right: '10px', 
                                            top: '50%', 
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            color: '#12687B'
                                        }}
                                        onClick={() => togglePasswordVisibility('newPassword')}
                                    >
                                        {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                {errors.newPassword && (
                                    <div className="invalid-feedback d-block">
                                        {errors.newPassword}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirmer mot de passe :</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type={showPasswords.confirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={passwords.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        style={{ paddingLeft: '30px', paddingRight: '40px' }}
                                        className={errors.confirmPassword ? 'is-invalid' : ''}
                                    />
                                    <FaLock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#12687B' }} />
                                    <div 
                                        style={{ 
                                            position: 'absolute', 
                                            right: '10px', 
                                            top: '50%', 
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            color: '#12687B'
                                        }}
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                    >
                                        {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                {errors.confirmPassword && (
                                    <div className="invalid-feedback d-block">
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </FormGroup>
                            <Button 
                                type="submit" 
                                style={{ backgroundColor: '#12687B', borderColor: '#12687B' }}
                                disabled={isSubmitting || Object.values(errors).some(error => error)}
                            >
                                {isSubmitting ? 'Changement en cours...' : 'Changer le mot de passe'}
                            </Button>
                        </Form>
                    </div>
                </div>
            </Card>
        </Fragment>
    );
}

export default UserDetails3;
