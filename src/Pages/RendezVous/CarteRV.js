import React, { useEffect, useState } from 'react';
import { getAppointments, demanderParticipation } from '../../api/appointment'; // Importer la nouvelle méthode API
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CarteRv = ({ onAppointmentAdded }) => { // Ajout du callback ici
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [patientId, setPatientId] = useState(null); // L'ID du patient, qui sera récupéré depuis l'API

    useEffect(() => {
        // Récupérer les informations de l'utilisateur connecté
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Si vous utilisez un token d'authentification
                    }
                });
                setPatientId(response.data._id);  // Mettre à jour l'ID du patient
            } catch (err) {
                console.error('Erreur lors de la récupération des informations utilisateur:', err);
            }
        };

        // Récupérer les rendez-vous
        const fetchAppointments = async () => {
            try {
                const data = await getAppointments();
                // Filtrer les rendez-vous en fonction de l'ID du patient
                const filteredAppointments = data.filter(appointment => appointment.patientId === patientId);
                setAppointments(filteredAppointments);
            } catch (err) {
                setError('Impossible de récupérer les rendez-vous.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();  // Récupérer l'ID de l'utilisateur
        fetchAppointments(); // Récupérer les rendez-vous
    }, [patientId]);

    const handleDemanderParticipation = async (appointmentId) => {
        if (!patientId) {
            alert('Veuillez sélectionner un patient avant de demander la participation.');
            return;
        }

        try {
            const response = await demanderParticipation(appointmentId, patientId); // Appel API pour la demande
            alert(response.message);  // Affiche un message de succès ou d'erreur
            onAppointmentAdded(appointmentId); // Appeler le callback après la demande
        } catch (error) {
            alert('Erreur lors de la demande de participation.');
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    if (loading) return <p>Chargement des rendez-vous...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container my-4">
            <style>
                {`
                    .slick-prev:before,
                    .slick-next:before {
                        color: #12687B;
                    }

                    .card {
                        background-color: white;
                        color: black;
                        border-radius: 15px;
                        padding: 15px;
                        text-align: center;
                        height: 290px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .profile-image {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        object-fit: cover;
                        margin-right: 10px;
                    }

                    .card-header {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        margin-bottom: 8px;
                    }

                    .card-title {
                        margin: 0;
                        font-size: 1rem;
                        font-weight: bold;
                    }

                    .text-muted {
                        font-size: 0.85rem;
                        color: gray;
                        margin: 0;
                    }

                    .card-text {
                        font-size: 0.9rem;
                        margin-bottom: 12px;
                    }

                    .btn-with-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        font-size: 0.9rem;
                        padding: 8px 12px;
                    }
                `}
            </style>

            <Slider {...settings}>
                {appointments.map((appointment) => {
                    const appointmentDate = new Date(appointment.date);
                    const now = new Date();
                    // Si le rendez-vous est dans le futur, on l'affiche
                    if (appointmentDate < now) return null;

                    return (
                        <div key={appointment._id} className="px-3">
                            <div className="card shadow">
                                {/* Image, nom et spécialité */}
                                <div className="card-header">
                                    <img src="https://via.placeholder.com/50" alt="Médecin" className="profile-image" />
                                    <div>
                                        <h5 className="card-title">{appointment.doctorId.nom} {appointment.doctorId.prenom}</h5>
                                        <p className="text-muted">{appointment.specialiste}</p>
                                    </div>
                                </div>

                                {/* Message au patient */}
                                <p className="card-text">
                                    Cher(e) patient(e),<br />
                                    Le Dr {appointment.doctorId.nom} est disponible le <strong>{new Date(appointment.date).toLocaleDateString()}</strong> de <strong>{appointment.heure_debut} à {appointment.heure_fin}</strong>.
                                </p>

                                {/* Bouton */}
                                <button className="btn btn-primary btn-with-icon" onClick={() => handleDemanderParticipation(appointment._id)}>
                                    <FontAwesomeIcon icon={faBell} style={{ color: 'yellow' }} />
                                    Prenez rendez-vous maintenant
                                </button>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default CarteRv;
