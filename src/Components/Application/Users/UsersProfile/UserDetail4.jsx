import { Fragment, useEffect, useState } from 'react';
import { FaPen, FaSave } from 'react-icons/fa';
import { H4 } from "../../../../AbstractElements";
import { Row, Col, CardHeader, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const UserDetail4 = () => {
    const [record, setRecord] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        dateNaissance: '',
        username: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const validate = (name, value) => {
        let error = '';
        switch (name) {
            case 'nom':
            case 'prenom':
                if (!value || value.trim().length < 3) {
                    error = 'Doit contenir au moins 3 caractères sans espace initial.';
                }
                break;
            
            case 'email':{
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Email invalide.';
                }
                break;
            }
            case 'telephone': {
                const phoneRegex = /^(70|75|76|77|78)[0-9]{7}$/;
                if (!phoneRegex.test(value)) {
                    error = 'Téléphone invalide (ex: 77XXXXXXX).';
                }
                break;
            }
            default:
                break;
            
        }
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('users/me');
                const userData = response.data;
                setRecord({
                    _id: userData._id,
                    nom: userData.nom,
                    prenom: userData.prenom,
                    email: userData.email,
                    telephone: userData.telephone,
                    dateNaissance: userData.dateNaissance,
                    username: userData.username,
                });
            } catch (error) {
                setError("Erreur lors de la récupération des données.");
                confirmAlert({
                    title: "Erreur",
                    message: "Erreur lors de la récupération des données utilisateur.",
                    buttons: [{ label: 'OK', className: 'btn btn-danger' }]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleEdit = () => setIsEditing(prev => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
        validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`users/${record._id}`, record);
            setIsEditing(false);
            confirmAlert({
                title: "Succès",
                message: "Vos informations ont été mises à jour avec succès.",
                buttons: [{ label: 'OK', className: 'btn btn-primary' }]
            });
        } catch (error) {
            const message = error.response?.data?.message || "Erreur inconnue";
            confirmAlert({
                title: "Erreur",
                message: message,
                buttons: [{ label: 'OK', className: 'btn btn-danger' }]
            });
        }
    };

    const isFormValid = () => {
        return Object.values(errors).every(err => !err) &&
            record.nom.trim().length >= 3 &&
            record.prenom.trim().length >= 3 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email) &&
            /^(70|75|76|77|78)[0-9]{7}$/.test(record.telephone);
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Fragment>
            <CardHeader className="d-flex justify-content-between align-items-center">
                <H4 attrH4={{ className: "card-title mb-0" }}>Informations personnelles</H4>
                {!isEditing && (
                    <button type="button" className="btn btn-secondary" onClick={toggleEdit}>
                        <FaPen /> Modifier ses informations
                    </button>
                )}
            </CardHeader>

            <Form onSubmit={handleSubmit}>
                {isEditing && (
                    <div className="text-end p-3">
                        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>
                            <FaSave /> Enregistrer les modifications
                        </button>
                    </div>
                )}
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label>Nom :</Label>
                                <Input
                                    type="text"
                                    name="nom"
                                    value={record.nom}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={errors.nom ? "is-invalid" : ""}
                                />
                                {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Prénom :</Label>
                                <Input
                                    type="text"
                                    name="prenom"
                                    value={record.prenom}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={errors.prenom ? "is-invalid" : ""}
                                />
                                {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Email :</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={record.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={errors.email ? "is-invalid" : ""}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Téléphone :</Label>
                                <Input
                                    type="text"
                                    name="telephone"
                                    value={record.telephone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={errors.telephone ? "is-invalid" : ""}
                                />
                                {errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Date de Naissance :</Label>
                                <Input
                                    type="date"
                                    name="dateNaissance"
                                    value={record.dateNaissance ? new Date(record.dateNaissance).toISOString().split('T')[0] : ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </FormGroup>

                            <FormGroup>
                            <Label>Nom d&apos;utilisateur :</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    value={record.username}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </Fragment>
    );
};

export default UserDetail4;
