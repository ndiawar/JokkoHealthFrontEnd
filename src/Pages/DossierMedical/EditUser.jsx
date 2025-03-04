import { Fragment, useEffect, useState } from 'react';
import { FaPen, FaSave } from 'react-icons/fa';
import { Btn, H4 } from "../../AbstractElements";
import { useForm } from "react-hook-form";
import { Row, Col, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { fetchMedicalRecordByUser, updateMedicalRecord } from '../../api/medical';

const EditMyProfile = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // État pour le mode édition

    // Fonction pour récupérer le dossier médical
    const fetchProfile = async () => {
        try {
            const record = await fetchMedicalRecordByUser();
            setProfile(record);
        } catch (error) {
            setError("Erreur lors de la récupération des informations.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour mettre à jour le dossier médical
    const updateProfile = async (data) => {
        try {
            const payload = {
                nom: data.nom,
                prenom: data.prenom,
                email: data.email,
                poids: data.poids,
                age: data.age,
                groupeSanguin: data.groupeSanguin,
                chirurgie: data.chirurgie,
                hospitalisation: data.hospitalisation, // Champ texte
                antecedentsFamiliaux: data.antecedentsFamiliaux
            };

            const updatedRecord = await updateMedicalRecord({ id: profile._id, updates: payload });
            setProfile(updatedRecord); // Mettre à jour l'état avec les nouvelles données
            alert("Profil mis à jour avec succès !");
            setIsEditing(false); // Quitter le mode édition après la mise à jour
        } catch (error) {
            alert("Erreur lors de la mise à jour du profil.");
            console.error(error);
        }
    };

    // Réinitialiser le formulaire avec les données du profil
    useEffect(() => {
        if (profile && profile.patientId) {
            reset({
                nom: profile.patientId.nom,
                prenom: profile.patientId.prenom,
                poids: profile.poids,
                age: profile.age,
                email: profile.patientId.email,
                groupeSanguin: profile.groupeSanguin,
                chirurgie: profile.chirurgie,
                hospitalisation: profile.hospitalisation, // Champ texte
                antecedentsFamiliaux: profile.antecedentsFamiliaux
            });
        }
    }, [profile, reset]);

    // Charger les données au montage du composant
    useEffect(() => {
        fetchProfile();
    }, []);

    const onEditSubmit = async (data) => {
        console.log("Données soumises :", data); // Vérifiez si les données sont capturées
        if (Object.keys(data).length === 0) {
            console.error("Aucune donnée capturée dans le formulaire.");
            return;
        }
    
        // Vérifiez que tous les champs nécessaires sont présents
        const requiredFields = [
            "nom", "prenom", "poids", "age", "email",
            "groupeSanguin", "chirurgie", "hospitalisation", "antecedentsFamiliaux"
        ];
    
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            console.error("Champs manquants :", missingFields);
        }
    
        await updateProfile(data);
    };

    // Basculer entre le mode édition et enregistrement
    const handleEditToggle = () => {
        console.log("Bouton cliqué !"); // Debug
        if (isEditing) {
            handleSubmit(onEditSubmit)(); // Soumettre le formulaire si on est en mode édition
        } else {
            setIsEditing(true); // Activer le mode édition
        }
    };

    // Affichage pendant le chargement ou en cas d'erreur
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Fragment>
            <Form className="card" onSubmit={handleSubmit(onEditSubmit)}>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <H4 attrH4={{ className: "card-title mb-0" }}>Informations personnelles</H4>
                    <Btn attrBtn={{ color: "primary", type: "button", onClick: handleEditToggle }}>
                        {isEditing ? <FaSave style={{ marginRight: '8px' }} /> : <FaPen style={{ marginRight: '8px' }} />}
                        {isEditing ? "Enregistrer" : "Éditer"}
                    </Btn>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                                {/* Champ Nom */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Nom</Label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nom"
                                        defaultValue={profile?.patientId?.nom || ""}
                                        {...register("nom", { required: "Nom est requis" })}
                                        disabled={!isEditing}
                                    />
                                    <span style={{ color: "red" }}>{errors.nom && errors.nom.message}</span>
                                </FormGroup>

                                {/* Champ Prénom */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Prénom</Label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Prénom"
                                        defaultValue={profile?.patientId?.prenom || ""}
                                        {...register("prenom", { required: "Prénom est requis" })}
                                        disabled={!isEditing}
                                    />
                                    <span style={{ color: "red" }}>{errors.prenom && errors.prenom.message}</span>
                                </FormGroup>

                                {/* Champ Poids */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Poids</Label>
                                    <Input
                                        className="form-control"
                                        type="number"
                                        placeholder="Poids"
                                        defaultValue={profile?.poids || ""}
                                        {...register("poids", { required: "Poids est requis" })}
                                        disabled={!isEditing}
                                    />
                                    <span style={{ color: "red" }}>{errors.poids && errors.poids.message}</span>
                                </FormGroup>

                                {/* Champ Âge */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Âge</Label>
                                    <Input
                                        className="form-control"
                                        type="number"
                                        placeholder="Âge"
                                        defaultValue={profile?.age || ""}
                                        {...register("age", { required: "Âge est requis" })}
                                        disabled={!isEditing}
                                    />
                                    <span style={{ color: "red" }}>{errors.age && errors.age.message}</span>
                                </FormGroup>

                                {/* Champ Email */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Email</Label>
                                    <Input
                                        className="form-control"
                                        type="email"
                                        placeholder="Email"
                                        defaultValue={profile?.patientId?.email || ""}
                                        {...register("email", { required: "Email est requis" })}
                                        disabled={!isEditing}
                                    />
                                    <span style={{ color: "red" }}>{errors.email && errors.email.message}</span>
                                </FormGroup>

                                {/* Champ Groupe sanguin */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Groupe sanguin</Label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Groupe sanguin"
                                        defaultValue={profile?.groupeSanguin || ""}
                                        {...register("groupeSanguin", { required: "Groupe sanguin est requis" })}
                                        disabled={!isEditing}
                                    />
                                    <span style={{ color: "red" }}>{errors.groupeSanguin && errors.groupeSanguin.message}</span>
                                </FormGroup>

                                {/* Champ Chirurgie */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Chirurgie</Label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Chirurgie"
                                        defaultValue={profile?.chirurgie || ""}
                                        {...register("chirurgie")}
                                        disabled={!isEditing}
                                    />
                                </FormGroup>

                                {/* Champ Hospitalisation (texte) */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Derniere hospitalisation</Label>
                                    <Input
                                        className="form-control"
                                        type="text" // Changement ici
                                        placeholder="Détails de l'hospitalisation"
                                        defaultValue={profile?.hospitalisation || ""}
                                        {...register("hospitalisation")}
                                        disabled={!isEditing}
                                    />
                                </FormGroup>

                                {/* Champ Antécédents familiaux */}
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Antécédents familiaux</Label>
                                    <Input
                                        type="textarea"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Antécédents familiaux"
                                        defaultValue={profile?.antecedentsFamiliaux || ""}
                                        {...register("antecedentsFamiliaux")}
                                        disabled={!isEditing}
                                    />
                                </FormGroup>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter className="text-end">
                </CardFooter>
            </Form>
        </Fragment>
    );
};

export default EditMyProfile;