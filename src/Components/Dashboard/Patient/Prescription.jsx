import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../../_helper/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaLungs, FaRegLightbulb, FaRegClock } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import NoSensorFound from "./NoSensorFound";

const Prescription = () => {
  const { user } = useContext(UserContext);
  const [heartRate, setHeartRate] = useState(null);
  const [oxygenLevel, setOxygenLevel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
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
        withCredentials: true,
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (response.data && response.data.sensorData) {
        const data = response.data.sensorData;
        setHeartRate(data.heartRate);
        setOxygenLevel(data.spo2);
        setError(null);
      } else {
        setError("Aucune donnée disponible");
      }
    } catch (err) {
      console.error("Erreur API:", err);
      setError(err.response?.data?.message || "Erreur lors de la récupération des données");
    } finally {
      setLoading(false);
    }
  };

  // Génération des recommandations basées sur les données
  useEffect(() => {
    const newRecommendations = [];

    // Recommandations pour la fréquence cardiaque
    if (heartRate !== null) {
      if (heartRate < 40) {
        newRecommendations.push({
          type: "urgence",
          title: "Bradycardie Extrême",
          description: "Votre fréquence cardiaque est très basse",
          advice: [
            "Consultez immédiatement un médecin",
            "Évitez toute activité physique",
            "Restez assis ou allongé",
            "Respirez profondément et calmement"
          ],
          icon: <FaHeartbeat />,
          color: "#dc3545"
        });
      } else if (heartRate < 50) {
        newRecommendations.push({
          type: "attention",
          title: "Bradycardie",
          description: "Votre fréquence cardiaque est basse",
          advice: [
            "Reposez-vous et évitez les efforts",
            "Surveillez votre rythme cardiaque",
            "Consultez un médecin si cela persiste",
            "Évitez les boissons stimulantes"
          ],
          icon: <FaHeartbeat />,
          color: "#ffc107"
        });
      } else if (heartRate > 100) {
        newRecommendations.push({
          type: "attention",
          title: "Tachycardie",
          description: "Votre fréquence cardiaque est élevée",
          advice: [
            "Reposez-vous et respirez profondément",
            "Évitez le stress et l'anxiété",
            "Hydratez-vous régulièrement",
            "Consultez un médecin si cela persiste"
          ],
          icon: <FaHeartbeat />,
          color: "#ffc107"
        });
      }
    }

    // Recommandations pour la saturation en oxygène
    if (oxygenLevel !== null) {
      if (oxygenLevel < 85) {
        newRecommendations.push({
          type: "urgence",
          title: "Danger Critique",
          description: "Votre saturation en oxygène est très basse",
          advice: [
            "Consultez immédiatement un médecin",
            "Utilisez un concentrateur d'oxygène si disponible",
            "Restez assis ou allongé",
            "Respirez profondément et calmement"
          ],
          icon: <FaLungs />,
          color: "#dc3545"
        });
      } else if (oxygenLevel < 90) {
        newRecommendations.push({
          type: "attention",
          title: "Hypoxémie",
          description: "Votre saturation en oxygène est basse",
          advice: [
            "Reposez-vous et respirez profondément",
            "Évitez les efforts physiques",
            "Consultez un médecin si cela persiste",
            "Maintenez une bonne posture pour faciliter la respiration"
          ],
          icon: <FaLungs />,
          color: "#ffc107"
        });
      }
    }

    // Recommandations générales si tout est normal
    if (newRecommendations.length === 0 && heartRate !== null && oxygenLevel !== null) {
      newRecommendations.push({
        type: "normal",
        title: "État Normal",
        description: "Vos paramètres vitaux sont dans les normes",
        advice: [
          "Continuez à maintenir une bonne hygiène de vie",
          "Pratiquez une activité physique régulière",
          "Maintenez une alimentation équilibrée",
          "Dormez suffisamment"
        ],
        icon: <MdCheckCircle />,
        color: "#198754"
      });
    }

    setRecommendations(newRecommendations);
  }, [heartRate, oxygenLevel]);

  useEffect(() => {
    fetchSensorData();
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <NoSensorFound message="Aucune donnée de capteur trouvée. Connectez un appareil pour recevoir des recommandations personnalisées." />;
  }

  const RecommendationCard = ({ recommendation }) => (
    <motion.div
      className="card mb-4 recommendation-card"
      style={{
        borderLeft: `4px solid ${recommendation.color}`,
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        background: `linear-gradient(135deg, ${recommendation.color}10 0%, ${recommendation.color}05 100%)`,
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <motion.div 
            style={{ 
              color: recommendation.color, 
              fontSize: '2rem', 
              marginRight: '15px',
              background: `linear-gradient(135deg, ${recommendation.color}20 0%, ${recommendation.color}10 100%)`,
              padding: '10px',
              borderRadius: '12px'
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            {recommendation.icon}
          </motion.div>
          <div>
            <h5 className="card-title mb-1" style={{ 
              color: recommendation.color,
              fontWeight: '600',
              fontSize: '1.2rem'
            }}>
              {recommendation.title}
            </h5>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              {recommendation.description}
            </p>
          </div>
        </div>
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h6 className="mb-3 d-flex align-items-center" style={{ 
            color: recommendation.color,
            fontWeight: '600'
          }}>
            <FaRegLightbulb className="me-2" />
            Recommandations
          </h6>
          <ul className="list-unstyled">
            <AnimatePresence>
              {recommendation.advice.map((advice, index) => (
                <motion.li
                  key={index}
                  className="mb-3 d-flex align-items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: `linear-gradient(135deg, ${recommendation.color}10 0%, ${recommendation.color}05 100%)`,
                    padding: '10px 15px',
                    borderRadius: '8px',
                    border: `1px solid ${recommendation.color}20`
                  }}
                >
                  <FaRegClock className="me-3" style={{ 
                    color: recommendation.color,
                    fontSize: '1.2rem'
                  }} />
                  <span style={{ fontSize: '0.95rem' }}>{advice}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="container py-4">
      <motion.div 
        className="row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="col-12">
          <motion.h4 
            className="mb-4 d-flex align-items-center"
            style={{ 
              fontWeight: '600',
              color: '#2c3e50'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaRegLightbulb className="me-2" style={{ color: '#f39c12' }} />
            Recommandations de Santé
          </motion.h4>
          <AnimatePresence>
            {recommendations.map((recommendation, index) => (
              <RecommendationCard key={index} recommendation={recommendation} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Prescription;