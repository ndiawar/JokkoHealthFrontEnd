import { Fragment, useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa'; // Importer l'icône de crayon
import { Btn, H4 } from "../../AbstractElements";
import { Row, Col, CardHeader, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const EditMyProfile = () => {
    const [record, setRecord] = useState({
        _id: '', // Ajoutez l'ID ici
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        age: '',
        poids: '',
        groupeSanguin: '',
        chirurgie: '',
        hospitalisation: '',
        antecedentsFamiliaux: '',
        status: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/medical/me');
                if (response.data.success) {
                    const medicalData = response.data.record;
                    setRecord({
                        _id: medicalData._id,
                        nom: medicalData.patientId.nom,
                        prenom: medicalData.patientId.prenom,
                        email: medicalData.patientId.email,
                        telephone: medicalData.patientId.telephone,
                        age: medicalData.age,
                        poids: medicalData.poids,
                        groupeSanguin: medicalData.groupeSanguin,
                        chirurgie: medicalData.chirurgie,
                        hospitalisation: medicalData.hospitalisation,
                        antecedentsFamiliaux: medicalData.antecedentsFamiliaux,
                        status: medicalData.status,
                    });
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
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
        try {
            const response = await axios.put(`/medical/${record._id}`, {
                nom: record.nom,
                prenom: record.prenom,
                email: record.email,
                telephone: record.telephone,
                age: record.age,
                poids: record.poids,
                groupeSanguin: record.groupeSanguin,
                chirurgie: record.chirurgie,
                hospitalisation: record.hospitalisation,
                antecedentsFamiliaux: record.antecedentsFamiliaux,
                status: record.status,
            });
    
            if (response.data.success) {
                alert("Profil mis à jour avec succès !");
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil :', error.response ? error.response.data : error.message);
            alert("Erreur lors de la mise à jour du profil.");
        }
    };
    
    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <H4 attrH4={{ className: "card-title mb-0" }}>Informations personnelles</H4>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label>Nom :</Label>
                                <Input type="text" name="nom" value={record.nom} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Prénom :</Label>
                                <Input type="text" name="prenom" value={record.prenom} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email :</Label>
                                <Input type="email" name="email" value={record.email} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Téléphone :</Label>
                                <Input type="text" name="telephone" value={record.telephone} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Âge :</Label>
                                <Input type="number" name="age" value={record.age} onChange={handleChange} />
                            </FormGroup>
                            {/* Bouton aligné à droite avec icône */}
                            <div className="text-end mb-3">
                                <Btn type="submit">
                                    <FaPen /> Modifier son dossier médical
                                </Btn>
                            </div>
                            <FormGroup>
                                <Label>Poids :</Label>
                                <Input type="number" name="poids" value={record.poids} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Groupe Sanguin :</Label>
                                <Input type="text" name="groupeSanguin" value={record.groupeSanguin} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Chirurgie :</Label>
                                <Input type="text" name="chirurgie" value={record.chirurgie} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Hospitalisation :</Label>
                                <Input type="text" name="hospitalisation" value={record.hospitalisation} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Antécédents Familiaux :</Label>
                                <Input type="text" name="antecedentsFamiliaux" value={record.antecedentsFamiliaux} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Statut :</Label>
                                <Input type="text" name="status" value={record.status} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </Fragment>
    );
};

export default EditMyProfile;