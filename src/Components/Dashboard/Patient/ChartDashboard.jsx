import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserContext from '../../../_helper/UserContext'; // Import du contexte utilisateur

// Couleurs mises à jour
const heartRateColor = '#007BFF'; // Bleu pour la fréquence cardiaque
const oxygenSaturationColor = '#28A745'; // Vert pour la saturation en oxygène

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

      const response = await axios.get('http://localhost:3001/api/sensorPatient/sensorPoul/currentPatientSensorData', {
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

  // Transformer les données du capteur pour les graphiques
  const heartRateData = {
    labels: historicalData.timestamps, // Horaires des lectures
    datasets: [
      {
        label: 'Fréquence Cardiaque',
        data: historicalData.heartRate, // Utilisation des données historiques de fréquence cardiaque
        borderColor: heartRateColor,
        backgroundColor: 'rgba(0, 123, 255, 0.4)', // Couleur bleue avec transparence
        borderWidth: 2,
      },
    ],
  };

  const oxygenSaturationData = {
    labels: historicalData.timestamps, // Horaires des lectures
    datasets: [
      {
        label: 'Saturation en Oxygène',
        data: historicalData.oxygenSaturation, // Utilisation des données historiques de saturation en oxygène
        borderColor: oxygenSaturationColor,
        backgroundColor: 'rgba(40, 167, 69, 0.4)', // Couleur verte avec transparence
        borderWidth: 2,
      },
    ],
  };

  // Options pour le graphique de fréquence cardiaque
  const heartRateOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false, // Masquer la légende
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 20, // Intervalles de 20
          min: 0, // Valeur minimale
          max: 100, // Valeur maximale
        },
        grid: {
          display: true,
          color: '#e0e0e0', // Couleur de la grille
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Options pour le graphique de saturation en oxygène
  const oxygenSaturationOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false, // Masquer la légende
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: '#e0e0e0', // Couleur de la grille
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: 'auto', marginLeft: '20px' }}>
      <h4 style={{ textAlign: 'left' }}>Fréquence Cardiaque</h4>
      <div style={{ height: '200px' }}>
        <Line data={heartRateData} options={heartRateOptions} />
      </div>
      <h4 style={{ textAlign: 'left' }}>Saturation en Oxygène (SpO2)</h4>
      <div style={{ height: '200px' }}>
        <Line data={oxygenSaturationData} options={oxygenSaturationOptions} />
      </div>
    </div>
  );
};

export default ChartDashboard;
