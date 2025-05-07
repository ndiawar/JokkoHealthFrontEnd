import { Fragment, useEffect, useState } from 'react';
import { FaPen, FaSave } from 'react-icons/fa';
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

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Liste des groupes sanguins possibles
    const bloodGroups = [
        'A+', 'A-',
        'B+', 'B-',
        'AB+', 'AB-',
        'O+', 'O-',
        'Inconnu'
    ];

    const validate = (name, value) => {
        let error = '';
        switch (name) {
            case 'age':
                if (value && (value < 0 || value > 120)) {
                    error = 'Âge invalide (0-120)';
                }
                break;
            case 'poids':
                if (value && (value < 0 || value > 300)) {
                    error = 'Poids invalide (0-300 kg)';
                }
                break;
            case 'groupeSanguin':
                if (value && !bloodGroups.includes(value)) {
                    error = 'Veuillez sélectionner un groupe valide';
                }
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/medical/me');
                if (response.data.success) {
                    const medicalData = response.data.record;
                    setRecord({
                        _id: medicalData._id,
                        age: medicalData.age || '',
                        poids: medicalData.poids || '',
                        groupeSanguin: medicalData.groupeSanguin || '',
                        chirurgie: medicalData.chirurgie || '',
                        hospitalisation: medicalData.hospitalisation || '',
                        antecedentsFamiliaux: medicalData.antecedentsFamiliaux || '',
                        status: medicalData.status || '',
                    });
                }
            } catch (error) {
                setError("Erreur lors de la récupération des données.");
                confirmAlert({
                    title: "Erreur",
                    message: "Erreur lors de la récupération des données médicales.",
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
            const response = await axios.put(`/medical/${record._id}`, record);
            if (response.data.success) {
                setIsEditing(false);
                confirmAlert({
                    title: "Succès",
                    message: "Votre dossier médical a été mis à jour avec succès.",
                    buttons: [{ label: 'OK', className: 'btn btn-primary' }]
                });
            }
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
            (!record.age || (record.age >= 0 && record.age <= 120)) &&
            (!record.poids || (record.poids >= 0 && record.poids <= 300)) &&
            (!record.groupeSanguin || bloodGroups.includes(record.groupeSanguin));
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Fragment>
            <CardHeader className="d-flex justify-content-between align-items-center">
                <H4 attrH4={{ className: "card-title mb-0" }}>Dossier Médical</H4>
                {!isEditing && (
                    <Btn attrBtn={{ color: 'secondary', onClick: toggleEdit }}>
                        <FaPen /> Modifier son dossier médical
                    </Btn>
                )}
            </CardHeader>

            <Form onSubmit={handleSubmit}>
                {isEditing && (
                    <div className="text-end p-3">
                        <Btn attrBtn={{ color: 'primary', type: 'submit', disabled: !isFormValid() }}>
                            <FaSave /> Enregistrer les modifications
                        </Btn>
                    </div>
                )}
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label>Âge :</Label>
                                <Input
                                    type="number"
                                    name="age"
                                    value={record.age}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={errors.age ? "is-invalid" : ""}
                                />
                                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Poids (kg) :</Label>
                                <Input
                                    type="number"
                                    name="poids"
                                    value={record.poids}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={errors.poids ? "is-invalid" : ""}
                                />
                                {errors.poids && <div className="invalid-feedback">{errors.poids}</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Groupe Sanguin :</Label>
                                <Input
                                    type="select"
                                    name="groupeSanguin"
                                    value={record.groupeSanguin}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={errors.groupeSanguin ? "is-invalid" : ""}
                                >
                                    <option value="">Sélectionnez un groupe sanguin</option>
                                    {bloodGroups.map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </Input>
                                {errors.groupeSanguin && <div className="invalid-feedback">{errors.groupeSanguin}</div>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Chirurgie :</Label>
                                <Input
                                    type="text"
                                    name="chirurgie"
                                    value={record.chirurgie}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Hospitalisation :</Label>
                                <Input
                                    type="text"
                                    name="hospitalisation"
                                    value={record.hospitalisation}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Antécédents Familiaux :</Label>
                                <Input
                                    type="text"
                                    name="antecedentsFamiliaux"
                                    value={record.antecedentsFamiliaux}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </Fragment>
    );
};

export default EditMyProfile;