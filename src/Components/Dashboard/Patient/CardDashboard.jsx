import React, { useEffect, useState, useContext } from "react";
// import { FaHeartbeat, FaWind, FaThermometerHalf } from "react-icons/fa";
import { GiHeartBeats, GiLungs, GiClockwork } from "react-icons/gi";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../../_helper/UserContext"; // Importez le contexte utilisateur
import NoSensorFound from "./NoSensorFound";

// Composant Card pour afficher les données
function Card({ icon, title, value, unit, status, color }) {
  const darkerColor = shadeColor(color, -20);

  return (
    <motion.div
      className="card shadow-sm bg-white rounded"
      style={{
        width: "16rem",
        height: "14rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        borderLeft: `5px solid ${color}`,
        textAlign: "center",
        backgroundColor: darkerColor,
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
        }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        style={{ fontSize: "3rem", color: color }}
        animate={{ 
          scale: [1, 1.1, 1],
          transition: { duration: 2, repeat: Infinity }
        }}
      >
        {icon}
      </motion.div>
      <h6 className="card-title text-muted mt-3" style={{ fontSize: "1rem", fontWeight: "600" }}>
        {title}
      </h6>
      <h4 className="card-text mt-2" style={{ fontSize: "1.8rem", fontWeight: "700" }}>
        {value} <span style={{ fontSize: "1rem", fontWeight: "500" }}>{unit}</span>
      </h4>
      <motion.span
        className="badge mt-3"
        style={{
          backgroundColor: color,
          fontSize: "0.9rem",
          padding: "0.5rem 1rem",
          borderRadius: "20px",
          fontWeight: "600"
        }}
        whileHover={{ scale: 1.05 }}
      >
        {status}
      </motion.span>
    </motion.div>
  );
}

// Fonction pour éclaircir ou assombrir les couleurs
function shadeColor(color, percent) {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.floor(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
}

function CardDashboard() {
  const { user } = useContext(UserContext); // Utilisation du contexte utilisateur
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les données du capteur
  const fetchSensorData = async () => {
    try {
      if (!user) {
        setError("Veuillez vous connecter pour accéder à ces données");
        setLoading(false);
        return;
      }

      const response = await axios.get('sensorPatient/sensorPoul/currentPatientSensorData', {
        withCredentials: true, // Assurez-vous d'envoyer les cookies pour l'authentification
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (response.data && response.data.sensorData) {
        setSensorData(response.data.sensorData);
        setError(null);
      } else {
        setError("Aucune donnée disponible");
      }
    } catch (err) {
      console.error("Erreur API:", err);
      const errorMessage = err.response?.data?.message || "Erreur lors de la récupération des données";
      setError(errorMessage);

      if (err.response?.status === 401) {
        toast.error("Session expirée - Veuillez vous reconnecter");
        window.location.href = '/login'; // Redirigez l'utilisateur vers la page de connexion si nécessaire
      }
    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour charger les données du capteur au premier rendu et toutes les 5 secondes
  useEffect(() => {
    if (user) {
      fetchSensorData();
    }

    const interval = setInterval(() => {
      if (user) {
        fetchSensorData();
      }
    }, 5000); // Requête toutes les 5 secondes

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [user]); // Si l'utilisateur change, refaites l'appel API

  // Fonction pour obtenir le statut du capteur
  const getStatus = (value, type) => {
    if (value === null || value === undefined) return "Inconnu";

    if (type === "heartRate") {
      if (value < 40) return "Critique";
      if (value < 50) return "Bradycardie";
      if (value > 100) return "Tachycardie";
      return "Normal";
    }

    if (type === "oxygenLevel") {
      if (value < 85) return "Danger";
      if (value < 90) return "Hypoxémie";
      return "Normal";
    }

    return "Normal";
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case "Critique":
      case "Danger":
        return "#FF0000"; // Rouge vif
      case "Bradycardie":
      case "Tachycardie":
      case "Hypoxémie":
        return "#FFA500"; // Orange
      case "Normal":
        return "#28A745"; // Vert
      default:
        return "#6C757D"; // Gris
    }
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  // Affichage des erreurs
  if (error) {
    return <NoSensorFound message="Aucun capteur détecté pour ce dossier médical. Connectez un appareil pour suivre vos constantes." />;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4 p-4">
      <motion.div 
        className="col-6 col-md-4 col-lg-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          icon={<GiHeartBeats size={60} />}
          title="Fréquence cardiaque"
          value={sensorData?.heartRate ?? "--"}
          unit="BPM"
          status={getStatus(sensorData?.heartRate, "heartRate")}
          color={getStatusColor(getStatus(sensorData?.heartRate, "heartRate"))}
        />
      </motion.div>
      <motion.div 
        className="col-6 col-md-4 col-lg-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card
          icon={<GiLungs size={60} />}
          title="Saturation O₂"
          value={sensorData?.spo2 ?? "--"}
          unit="%"
          status={getStatus(sensorData?.spo2, "oxygenLevel")}
          color={getStatusColor(getStatus(sensorData?.spo2, "oxygenLevel"))}
        />
      </motion.div>
      <motion.div 
        className="col-6 col-md-4 col-lg-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card
          icon={<GiClockwork size={60} />}
          title="Dernière lecture"
          value={sensorData?.timestamp
            ? new Date(sensorData.timestamp).toLocaleTimeString('fr-FR')
            : "--"}
          unit=""
          status={sensorData?.timestamp ? "Actif" : "Inactif"}
          color={sensorData?.timestamp ? "#0D6EFD" : "#6C757D"}
        />
      </motion.div>
    </div>
  );
}

export default CardDashboard;