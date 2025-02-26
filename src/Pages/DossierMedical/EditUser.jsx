import { Fragment } from 'react'; // Ajoutez cette ligne
import { FaPen } from 'react-icons/fa'; // Importer l'icône bic (stylo)
import { Btn, H4 } from "../../AbstractElements";
import { useForm } from "react-hook-form";
import { Row, Col, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const EditMyProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onEditSubmit = (data) => {
        alert(JSON.stringify(data));
    }

    return (
        <Fragment>
            <Form className="card" onSubmit={handleSubmit(onEditSubmit)}>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <H4 attrH4={{ className: "card-title mb-0" }}>Informations personnelles</H4>
                    <Btn attrBtn={{ color: "primary", type: "submit" }}>
                        <FaPen style={{ marginRight: '8px' }} /> Éditer
                    </Btn>
                </CardHeader>
                <CardBody>
                    <Row>
                        {/* Première Partie - Séparée par une bordure autour du groupe */}
                        <Col xs="12">
                            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Prénom</Label>
                                    <Input className="form-control" type="text" placeholder="Prénom" {...register("firstName", { required: "Prénom est requis" })} />
                                    <span style={{ color: "red" }}>{errors.firstName && errors.firstName.message}</span>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Nom</Label>
                                    <Input className="form-control" type="text" placeholder="Nom" {...register("lastName", { required: "Nom est requis" })} />
                                    <span style={{ color: "red" }}>{errors.lastName && errors.lastName.message}</span>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Numéro de téléphone</Label>
                                    <Input className="form-control" type="text" placeholder="Numéro de téléphone" {...register("phoneNumber", { required: "Numéro de téléphone est requis" })} />
                                    <span style={{ color: "red" }}>{errors.phoneNumber && errors.phoneNumber.message}</span>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Poids</Label>
                                    <Input className="form-control" type="number" placeholder="Poids" {...register("weight", { required: "Poids est requis" })} />
                                    <span style={{ color: "red" }}>{errors.weight && errors.weight.message}</span>
                                </FormGroup>
                            </div>
                        </Col>

                        {/* Deuxième Partie - Séparée par une bordure autour du groupe */}
                        <Col xs="12">
                            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Groupe sanguin</Label>
                                    <Input className="form-control" type="text" placeholder="Groupe sanguin" {...register("bloodGroup", { required: "Groupe sanguin est requis" })} />
                                    <span style={{ color: "red" }}>{errors.bloodGroup && errors.bloodGroup.message}</span>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Âge</Label>
                                    <Input className="form-control" type="number" placeholder="Âge" {...register("age", { required: "Âge est requis" })} />
                                    <span style={{ color: "red" }}>{errors.age && errors.age.message}</span>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Email</Label>
                                    <Input className="form-control" type="email" placeholder="Email" {...register("email", { required: "Email est requis" })} />
                                    <span style={{ color: "red" }}>{errors.email && errors.email.message}</span>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Antécédents Médicaux et Allergies</Label>
                                    <Input type="textarea" className="form-control" rows="3" placeholder="Antécédents Médicaux et Allergies" {...register("medicalHistory")} />
                                </FormGroup>
                               
                                <FormGroup className="mb-3">
                                    <Label className="form-label">Chirurgies et hospitalisations passées</Label>
                                    <Input type="textarea" className="form-control" rows="3" placeholder="Chirurgies et hospitalisations passées" {...register("pastSurgeries")} />
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
}

export default EditMyProfile;
