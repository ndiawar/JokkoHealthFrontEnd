import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../../_helper/UserContext'; // Import du contexte utilisateur

// Détection des anomalies pour la fréquence cardiaque et la saturation en oxygène
const detectHeartRateAnomalies = (heartRate) => {
  let anomalies = [];
  if (heartRate < 40) {
    anomalies.push("Bradycardie extrême détectée! Fréquence cardiaque trop basse.");
  } else if (heartRate < 50) {
    anomalies.push("Bradycardie détectée! Fréquence cardiaque trop basse.");
  } else if (heartRate > 100) {
    anomalies.push("Tachycardie détectée! Fréquence cardiaque trop élevée.");
  }
  return anomalies;
};

const detectOxygenAnomalies = (oxygenLevel) => {
  let anomalies = [];
  if (oxygenLevel < 90) {
    anomalies.push("Hypoxémie détectée! SpO2 trop bas.");
  }
  if (oxygenLevel < 85) {
    anomalies.push("Danger critique! SpO2 trop bas.");
  }
  return anomalies;
};

// Le composant Prescription qui affiche les anomalies et les prescriptions
const Prescription = () => {
  const { user } = useContext(UserContext); // Utilisation du contexte utilisateur
  const [heartRate, setHeartRate] = useState(null);
  const [oxygenLevel, setOxygenLevel] = useState(null);
  const [heartRateAnomalies, setHeartRateAnomalies] = useState([]);
  const [oxygenAnomalies, setOxygenAnomalies] = useState([]);
  const [heartRatePrescriptions, setHeartRatePrescriptions] = useState([]);
  const [oxygenPrescriptions, setOxygenPrescriptions] = useState([]);
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

      const response = await axios.get('http://localhost:3001/api/sensorPatient/sensorPoul/currentPatientSensorData', {
        withCredentials: true, // Assurez-vous d'envoyer les cookies pour l'authentification
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response.data && response.data.sensorData) {
        const data = response.data.sensorData;
        setHeartRate(data.heartRate);
        setOxygenLevel(data.spo2);

        setError(null); // Réinitialiser l'erreur
      } else {
        setError("Aucune donnée disponible");
      }
    } catch (err) {
      console.error("Erreur API:", err);
      const errorMessage = err.response?.data?.message || "Erreur lors de la récupération des données";
      setError(errorMessage);
    } finally {
      setLoading(false); // Mettre à jour l'état de chargement
    }
  };

  // Détection et mise à jour des anomalies et prescriptions pour la fréquence cardiaque et SpO2
  useEffect(() => {
    if (heartRate !== null) {
      const detectedHeartRateAnomalies = detectHeartRateAnomalies(heartRate);
      const heartRateMedicalPrescriptions = detectedHeartRateAnomalies.map((anomaly) => {
        if (anomaly.includes("Bradycardie") || anomaly.includes("Tachycardie")) {
          return "Consultez un médecin pour un suivi cardiaque et ajustez votre activité physique.";
        }
        return null;
      }).filter(Boolean);

      setHeartRateAnomalies(detectedHeartRateAnomalies);
      setHeartRatePrescriptions(heartRateMedicalPrescriptions);
    }

    if (oxygenLevel !== null) {
      const detectedOxygenAnomalies = detectOxygenAnomalies(oxygenLevel);
      const oxygenMedicalPrescriptions = detectedOxygenAnomalies.map((anomaly) => {
        if (anomaly.includes("Hypoxémie") || anomaly.includes("Danger critique")) {
          return "Consultez immédiatement un professionnel de santé. Utilisation d'un concentrateur d'oxygène recommandé.";
        }
        return null;
      }).filter(Boolean);

      setOxygenAnomalies(detectedOxygenAnomalies);
      setOxygenPrescriptions(oxygenMedicalPrescriptions);
    }
  }, [heartRate, oxygenLevel]);

  // Utilisation de useEffect pour charger les données du capteur au premier rendu
  useEffect(() => {
    fetchSensorData(); // Charger les données une fois au montage
  }, [user]); // Exécuter lorsque le user est défini ou modifié

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
    return (
      <div className="alert alert-danger text-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '950px', margin: '20px auto', padding: '20px' }}>
      {/* Accordéon pour la fréquence cardiaque */}
      <div className="accordion" id="heartRateAccordion">
        <h4>Fréquence Cardiaque</h4>
        {heartRateAnomalies.length > 0 ? (
          heartRateAnomalies.map((anomaly, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`headingHeartRate${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseHeartRate${index}`}
                  aria-expanded="false"
                  aria-controls={`collapseHeartRate${index}`}>
                  {anomaly}
                </button>
              </h2>
              <div
                id={`collapseHeartRate${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingHeartRate${index}`}>
                <div className="accordion-body">
                  {heartRatePrescriptions[index] || "Recommandations générales : consultez un professionnel de santé."}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-success text-center">
            Aucune anomalie détectée pour la fréquence cardiaque.
          </div>
        )}
      </div>

      {/* Accordéon pour la saturation en oxygène */}
      <div className="accordion" id="oxygenAccordion">
        <h4>Saturation en Oxygène (SpO2)</h4>
        {oxygenAnomalies.length > 0 ? (
          oxygenAnomalies.map((anomaly, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`headingOxygen${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseOxygen${index}`}
                  aria-expanded="false"
                  aria-controls={`collapseOxygen${index}`}>
                  {anomaly}
                </button>
              </h2>
              <div
                id={`collapseOxygen${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingOxygen${index}`}>
                <div className="accordion-body">
                  {oxygenPrescriptions[index] || "Recommandations générales : consultez un professionnel de santé."}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-success text-center">
            Aucune anomalie détectée pour la saturation en oxygène.
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescription;
