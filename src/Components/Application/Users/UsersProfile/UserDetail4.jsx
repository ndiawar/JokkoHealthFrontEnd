import React, { Fragment, useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa'; // Importer l'icône de crayon
import { Btn, H4 } from "../../../../AbstractElements";
import { Row, Col, CardHeader, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const UserDetail4 = () => {
    const [record, setRecord] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        dateNaissance: '',
        username: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('users/me');
                const userData = response.data;
                setRecord({
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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profil mis à jour avec succès !");
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <H4 attrH4={{ className: "card-title mb-0" }}>Informations personnelles</H4>
                    {/* Bouton aligné à droite avec icône */}
                    <Btn type="submit">
                        <FaPen /> Modifier ses informations
                    </Btn>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label>Nom :</Label>
                                <Input type="text" name="nom" value={record.nom} readOnly />
                            </FormGroup>
                            <FormGroup>
                                <Label>Prénom :</Label>
                                <Input type="text" name="prenom" value={record.prenom} readOnly />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email :</Label>
                                <Input type="email" name="email" value={record.email} readOnly />
                            </FormGroup>
                            <FormGroup>
                                <Label>Téléphone :</Label>
                                <Input type="text" name="telephone" value={record.telephone} readOnly />
                            </FormGroup>
                            <FormGroup>
                                <Label>Date de Naissance :</Label>
                                <Input
                                    type="date"
                                    name="dateNaissance"
                                    value={record.dateNaissance ? new Date(record.dateNaissance).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setRecord({ ...record, dateNaissance: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Nom d'utilisateur :</Label>
                                <Input type="text" name="username" value={record.username} readOnly />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </Fragment>
    );
};

export default UserDetail4;
