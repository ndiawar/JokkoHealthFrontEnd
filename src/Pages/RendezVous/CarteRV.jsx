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
      right: "-50px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      backgroundColor: "#3e7e8c",
      color: "#FFFFFF",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
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
      left: "-50px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      backgroundColor: "#3e7e8c",
      color: "#FFFFFF",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
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
        setAppointments(data);
      } catch (err) {
        console.error("Impossible de récupérer les rendez-vous.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchAppointments();
  }, [patientId]);

  const handleDemanderParticipation = async (appointmentId) => {
    if (!patientId) {
      toast.error("Veuillez vous connecter pour demander un rendez-vous.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await requestAppointment(appointmentId);
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
      });
      onAppointmentAdded(appointmentId);
    } catch (error) {
      toast.error("Erreur lors de la demande de participation.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading) return <p>Chargement des rendez-vous...</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="container my-4">
      <style>
        {`
          .card-container {
            margin: 0 10px; /* Ajout d’un espace entre les cartes */
          }

          .card {
            background-color: white;
            color: black;
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            height: 250px;
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

          .empty-message {
            text-align: center;
            margin-top: 50px;
            font-size: 1.5rem;
            color: gray;
          }

          .empty-message .icon {
            font-size: 5rem;
            color: #3e7e8c;
          }

          .slick-prev, .slick-next {
            z-index: 10;
            width: 40px;
            height: 40px;
          }

          .slick-prev {
            left: -50px; /* Espace entre bouton et cartes */
          }

          .slick-next {
            right: -50px; /* Espace entre bouton et cartes */
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
              <div className="card shadow">
                <div className="card-header">
                  <img src="https://via.placeholder.com/50" alt="Médecin" className="profile-image" />
                  <div>
                    <h5 className="card-title">
                      {appointment.doctorId.nom} {appointment.doctorId.prenom}
                    </h5>
                    <p className="text-muted">{appointment.specialiste}</p>
                  </div>
                </div>

                <p className="card-text">
                  Cher(e) patient(e),<br />
                  Le Dr {appointment.doctorId.nom} est disponible le{" "}
                  <strong>{new Date(appointment.date).toLocaleDateString()}</strong> de{" "}
                  <strong>
                    {appointment.heure_debut} à {appointment.heure_fin}
                  </strong>.
                </p>

                <button
                  className="btn btn-primary btn-with-icon"
                  onClick={() => handleDemanderParticipation(appointment._id)}
                >
                  <FontAwesomeIcon icon={faBell} style={{ color: "yellow" }} />
                  Prenez rendez-vous maintenant
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
