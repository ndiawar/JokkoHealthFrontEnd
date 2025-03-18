import React, { Fragment, useEffect, useState } from 'react';
import { FaPen, FaSave } from 'react-icons/fa';
import { Btn, H4 } from "../../../../AbstractElements";
import { Row, Col, CardHeader, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importer SweetAlert2

const UserDetail4 = () => {
    const [record, setRecord] = useState({
        id: '', // Assurez-vous que l'ID est récupéré
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        dateNaissance: '',
        username: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('users/me');
                const userData = response.data;
                console.log('Données reçues de l\'API :', userData); // Log des données reçues
                setRecord({
                    id: userData._id, // Utilisez userData._id au lieu de userData.id
                    nom: userData.nom,
                    prenom: userData.prenom,
                    email: userData.email,
                    telephone: userData.telephone,
                    dateNaissance: userData.dateNaissance,
                    username: userData.username,
                });
            } catch (error) {
                setError("Erreur lors de la récupération des données.");
                console.error('Erreur lors de la récupération des données :', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Erreur lors de la récupération des données.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord((prevRecord) => ({
            ...prevRecord,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            try {
                console.log('Envoi des données :', record); // Log des données envoyées
                if (!record.id) {
                    console.error('ID non défini');
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'ID non défini.',
                    });
                    return;
                }
                const response = await axios.put(`users/${record.id}`, record);
                console.log('Réponse de l\'API :', response.data); // Log de la réponse de l'API

                // Afficher un message de succès avec SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Profil mis à jour avec succès !',
                });

                setIsEditing(false);
            } catch (error) {
                setError("Erreur lors de la mise à jour des données.");
                console.error('Erreur lors de la mise à jour des données :', error);

                // Afficher un message d'erreur avec SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Erreur lors de la mise à jour des données.',
                });

                if (error.response) {
                    console.error('Erreur de réponse du serveur :', error.response.data);
                } else if (error.request) {
                    console.error('Pas de réponse du serveur :', error.request);
                } else {
                    console.error('Erreur de configuration de la requête :', error.message);
                }
            }
        } else {
            setIsEditing(true);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <H4 attrH4={{ className: "card-title mb-0" }}>Informations personnelles</H4>
                    <Btn type="submit">
                        {isEditing ? <FaSave /> : <FaPen />}
                        {isEditing ? ' Enregistrer' : ' Modifier ses informations'}
                    </Btn>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label>Nom :</Label>
                                <Input type="text" name="nom" value={record.nom} onChange={handleChange} disabled={!isEditing} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Prénom :</Label>
                                <Input type="text" name="prenom" value={record.prenom} onChange={handleChange} disabled={!isEditing} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email :</Label>
                                <Input type="email" name="email" value={record.email} onChange={handleChange} disabled={!isEditing} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Téléphone :</Label>
                                <Input type="text" name="telephone" value={record.telephone} onChange={handleChange} disabled={!isEditing} />
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
                                <Label>Nom d'utilisateur :</Label>
                                <Input type="text" name="username" value={record.username} onChange={handleChange} disabled={!isEditing} />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </Fragment>
    );
};

export default UserDetail4;