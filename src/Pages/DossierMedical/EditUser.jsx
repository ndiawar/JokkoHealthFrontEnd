import { Fragment, useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { Btn, H4 } from "../../AbstractElements";
import { Row, Col, CardHeader, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EditMyProfile = () => {
    const [record, setRecord] = useState({
        _id: '',
        age: '',
        poids: '',
        groupeSanguin: '',
        chirurgie: '',
        hospitalisation: '',
        antecedentsFamiliaux: '',
        status: '',
    });
    
    const [initialRecord, setInitialRecord] = useState({}); // Stocke les valeurs initiales

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/medical/me');
                if (response.data.success) {
                    const medicalData = response.data.record;
                    const initialData = {
                        _id: medicalData._id,
                        age: medicalData.age,
                        poids: medicalData.poids,
                        groupeSanguin: medicalData.groupeSanguin,
                        chirurgie: medicalData.chirurgie,
                        hospitalisation: medicalData.hospitalisation,
                        antecedentsFamiliaux: medicalData.antecedentsFamiliaux,
                        status: medicalData.status,
                    };
                    setRecord(initialData);
                    setInitialRecord(initialData); // Sauvegarde les valeurs initiales
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                showAlert('Erreur', 'Erreur lors de la récupération des données médicales', 'error');
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

    const showAlert = (title, message, type = 'success') => {
        confirmAlert({
            title: title,
            message: message,
            buttons: [
                {
                    label: 'OK',
                    className: type === 'error' ? 'btn btn-danger' : 'btn btn-primary'
                }
            ]
        });
    };

    // Fonction pour vérifier si des champs ont été modifiés
    const hasChanges = () => {
        return Object.keys(record).some(
            key => record[key] !== initialRecord[key]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Vérifier s'il y a des modifications
        if (!hasChanges()) {
            showAlert('Information', 'Aucun champ modifié', 'info');
            return;
        }
        
        confirmAlert({
            title: 'Confirmation',
            message: 'Êtes-vous sûr de vouloir modifier votre dossier médical ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        try {
                            const response = await axios.put(`/medical/${record._id}`, {
                                age: record.age,
                                poids: record.poids,
                                groupeSanguin: record.groupeSanguin,
                                chirurgie: record.chirurgie,
                                hospitalisation: record.hospitalisation,
                                antecedentsFamiliaux: record.antecedentsFamiliaux,
                                status: record.status,
                            });

                            if (response.data.success) {
                                showAlert('Succès', 'Profil mis à jour avec succès !');
                                // Mettre à jour les valeurs initiales après une modification réussie
                                setInitialRecord({...record});
                            }
                        } catch (error) {
                            console.error('Erreur lors de la mise à jour du profil :', error.response ? error.response.data : error.message);
                            showAlert('Erreur', "Erreur lors de la mise à jour du profil.", 'error');
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick: () => {}
                }
            ]
        });
    };

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <H4 attrH4={{ className: "card-title mb-0" }}>Dossier Médical</H4>
                    <div className="text-end mb-3">
                        <Btn type="submit">
                            <FaPen /> Modifier son dossier médical
                        </Btn>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label>Âge :</Label>
                                <Input type="number" name="age" value={record.age} onChange={handleChange} />
                            </FormGroup>
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