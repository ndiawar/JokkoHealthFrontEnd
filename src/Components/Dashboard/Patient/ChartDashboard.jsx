import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserContext from '../../../_helper/UserContext'; // Import du contexte utilisateur
import { FaHeartbeat, FaLungs } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Couleurs mises à jour avec des tons plus doux et des dégradés
const heartRateColor = 'rgba(220, 53, 69, 0.8)';
const heartRateGradient = 'rgba(220, 53, 69, 0.1)';
const oxygenSaturationColor = 'rgba(13, 110, 253, 0.8)';
const oxygenSaturationGradient = 'rgba(13, 110, 253, 0.1)';
const gridColor = 'rgba(0, 0, 0, 0.05)';

// Composant pour afficher les graphiques des capteurs
const ChartDashboard = () => {
  const { user } = useContext(UserContext); // Utilisation du contexte utilisateur
  const [sensorData, setSensorData] = useState(null); // Données du capteur
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Erreur potentielle
  const [historicalData, setHistoricalData] = useState({
    heartRate: [],
    oxygenSaturation: [],
    timestamps: []
  });

  const maxHistoryLength = 10; // Limite de points historiques sur le graphique

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
        const data = response.data.sensorData;
        setSensorData(data);

        // Ajouter les nouvelles données à l'historique
        setHistoricalData((prevData) => {
          const newHeartRateData = [...prevData.heartRate, data.heartRate]; // Remplacer la température par la fréquence cardiaque
          const newOxygenSaturationData = [...prevData.oxygenSaturation, data.spo2]; // Saturation en oxygène
          const newTimestamps = [...prevData.timestamps, new Date(data.timestamp).toLocaleTimeString()];

          // Limiter la taille de l'historique
          if (newHeartRateData.length > maxHistoryLength) newHeartRateData.shift();
          if (newOxygenSaturationData.length > maxHistoryLength) newOxygenSaturationData.shift();
          if (newTimestamps.length > maxHistoryLength) newTimestamps.shift();

          return {
            heartRate: newHeartRateData,
            oxygenSaturation: newOxygenSaturationData,
            timestamps: newTimestamps
          };
        });

        setError(null); // Réinitialiser l'erreur
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
      setLoading(false); // Mettre à jour l'état de chargement
    }
  };

  // Utilisation de useEffect pour charger les données du capteur au premier rendu
  useEffect(() => {
    if (user) {
      fetchSensorData(); // Charger les données une fois au montage
    }

    // Rafraîchir les données toutes les 5 secondes
    const interval = setInterval(() => {
      if (user) {
        fetchSensorData();
      }
    }, 5000); // Requête toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
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

  // Vérifier que les données existent avant de continuer
  if (!sensorData) {
    return <div>Aucune donnée du capteur disponible.</div>;
  }

  // Options pour le graphique de fréquence cardiaque
  const heartRateOptions = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} BPM`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 20,
          min: 0,
          max: 100,
          color: '#6c757d',
          font: {
            size: 12,
            weight: '500'
          }
        },
        grid: {
          color: gridColor,
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6c757d',
          font: {
            size: 12,
            weight: '500'
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        backgroundColor: heartRateColor,
        borderWidth: 2,
        borderColor: '#fff'
      }
    }
  };

  // Options pour le graphique de saturation en oxygène
  const oxygenSaturationOptions = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 10,
          min: 0,
          max: 100,
          color: '#6c757d',
          font: {
            size: 12,
            weight: '500'
          }
        },
        grid: {
          color: gridColor,
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6c757d',
          font: {
            size: 12,
            weight: '500'
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        backgroundColor: oxygenSaturationColor,
        borderWidth: 2,
        borderColor: '#fff'
      }
    }
  };

  // Transformer les données du capteur pour les graphiques
  const heartRateData = {
    labels: historicalData.timestamps,
    datasets: [
      {
        label: 'Fréquence Cardiaque',
        data: historicalData.heartRate,
        borderColor: heartRateColor,
        backgroundColor: heartRateGradient,
        borderWidth: 2,
        fill: true
      }
    ]
  };

  const oxygenSaturationData = {
    labels: historicalData.timestamps,
    datasets: [
      {
        label: 'Saturation en Oxygène',
        data: historicalData.oxygenSaturation,
        borderColor: oxygenSaturationColor,
        backgroundColor: oxygenSaturationGradient,
        borderWidth: 2,
        fill: true
      }
    ]
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: 'auto', marginLeft: '20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex align-items-center mb-3">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <FaHeartbeat style={{ 
              color: heartRateColor, 
              fontSize: '2.9rem',
              background: heartRateGradient,
              padding: '8px',
              borderRadius: '50%',
              boxShadow: '0 2px 6px rgba(220, 53, 69, 0.2)'
            }} />
          </motion.div>
          <h4 style={{ 
            textAlign: 'left', 
            color: heartRateColor, 
            margin: '0 0 0 15px',
            fontWeight: '600',
            fontSize: '1.4rem'
          }}>
            Fréquence Cardiaque
          </h4>
        </div>
        <div style={{ 
          height: '200px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: `1px solid ${heartRateGradient}`
        }}>
          <Line data={heartRateData} options={heartRateOptions} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4"
      >
        <div className="d-flex align-items-center mb-3">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <FaLungs style={{ 
              color: oxygenSaturationColor, 
              fontSize: '2.9rem',
              background: oxygenSaturationGradient,
              padding: '8px',
              borderRadius: '50%',
              boxShadow: '0 2px 6px rgba(13, 110, 253, 0.2)'
            }} />
          </motion.div>
          <h4 style={{ 
            textAlign: 'left', 
            color: oxygenSaturationColor, 
            margin: '0 0 0 15px',
            fontWeight: '600',
            fontSize: '1.4rem'
          }}>
            Saturation en Oxygène (SpO2)
          </h4>
        </div>
        <div style={{ 
          height: '200px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: `1px solid ${oxygenSaturationGradient}`
        }}>
          <Line data={oxygenSaturationData} options={oxygenSaturationOptions} />
        </div>
      </motion.div>
    </div>
  );
};

export default ChartDashboard;