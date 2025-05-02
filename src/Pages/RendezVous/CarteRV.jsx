import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAvailableAppointments, requestAppointment } from "../../api/ApiRendezVous";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      right: "-30px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      backgroundColor: "#3e7e8c",
      color: "#FFFFFF",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    }}
    onClick={onClick}
  >
    ➡
  </div>
);

const SamplePrevArrow = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "-30px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      backgroundColor: "#3e7e8c",
      color: "#FFFFFF",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    }}
    onClick={onClick}
  >
    ⬅
  </div>
);

const CarteRv = ({ onAppointmentAdded }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPatientId(response.data._id);
      } catch (err) {
        console.error("Erreur lors de la récupération des informations utilisateur:", err);
      }
    };

    const fetchAppointments = async () => {
      try {
        const data = await getAvailableAppointments();
        // Filtrer les rendez-vous pour éviter les doublons
        const uniqueAppointments = Array.from(new Set(data.map(a => a._id)))
          .map(id => data.find(a => a._id === id));
        setAppointments(uniqueAppointments);
      } catch (err) {
        console.error("Impossible de récupérer les rendez-vous.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchAppointments();
  }, []);

  const handleDemanderParticipation = async (appointmentId) => {
    if (isRequesting) return;
    
    if (!patientId) {
      toast.error("Veuillez vous connecter pour demander un rendez-vous.");
      return;
    }

    setIsRequesting(true);
    try {
      const response = await requestAppointment(appointmentId, patientId);
      toast.success(response.message);
      if (onAppointmentAdded) {
        onAppointmentAdded(appointmentId);
      }
      // Mettre à jour la liste des rendez-vous après une demande réussie
      setAppointments(prev => prev.filter(app => app._id !== appointmentId));
    } catch (error) {
      toast.error("Erreur lors de la demande de participation.");
    } finally {
      setIsRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="container my-4">
      <style>
        {`
          .card-container {
            padding: 10px;
          }

          .card {
            background-color: white;
            color: black;
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            height: auto;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 0 auto;
            max-width: 400px;
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
            margin-bottom: 15px;
          }

          .card-title {
            margin: 0;
            font-size: 1.1rem;
            font-weight: bold;
          }

          .text-muted {
            font-size: 0.9rem;
            color: #666;
            margin: 0;
          }

          .card-text {
            font-size: 1rem;
            margin-bottom: 20px;
            line-height: 1.5;
          }

          .btn-with-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 1rem;
            padding: 10px 20px;
            background-color: #3e7e8c;
            border: none;
            transition: all 0.3s ease;
          }

          .btn-with-icon:hover:not(:disabled) {
            background-color: #2c5d6f;
            transform: translateY(-2px);
          }

          .btn-with-icon:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }

          .empty-message {
            text-align: center;
            margin-top: 50px;
            padding: 20px;
          }

          .empty-message .icon {
            font-size: 3rem;
            color: #3e7e8c;
            margin-bottom: 15px;
          }

          .slick-slider {
            margin: 0 40px;
          }

          .slick-track {
            display: flex;
            align-items: center;
          }

          .slick-slide {
            opacity: 0.5;
            transition: opacity 0.3s ease;
          }

          .slick-slide.slick-active {
            opacity: 1;
          }
        `}
      </style>

      {appointments.length === 0 ? (
        <div className="empty-message">
          <FontAwesomeIcon icon={faExclamationCircle} className="icon" />
          <p>Pour le moment, la liste des rendez-vous est vide.</p>
        </div>
      ) : (
        <Slider {...settings}>
          {appointments.map((appointment) => (
            <div key={appointment._id} className="card-container">
              <div className="card">
                <div className="card-header">
                  <img src="https://via.placeholder.com/50" alt="Médecin" className="profile-image" />
                  <div>
                    <h5 className="card-title">
                      {appointment.doctorId?.nom || 'Médecin'} {appointment.doctorId?.prenom || ''}
                    </h5>
                    <p className="text-muted">{appointment.specialiste || 'Spécialiste'}</p>
                  </div>
                </div>

                <p className="card-text">
                  Cher(e) patient(e),<br />
                  Le Dr {appointment.doctorId?.nom || 'Médecin'} est disponible le{" "}
                  <strong>
                    {new Date(appointment.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </strong>
                  <br />de{" "}
                  <strong>
                    {appointment.heure_debut} à {appointment.heure_fin}
                  </strong>
                </p>

                <button
                  className="btn btn-primary btn-with-icon"
                  onClick={() => handleDemanderParticipation(appointment._id)}
                  disabled={isRequesting}
                >
                  <FontAwesomeIcon icon={faBell} style={{ color: "yellow" }} />
                  {isRequesting ? 'En cours...' : 'Prenez rendez-vous maintenant'}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default CarteRv;
