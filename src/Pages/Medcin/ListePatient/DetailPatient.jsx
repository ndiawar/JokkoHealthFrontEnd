import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faTint, faThermometerHalf, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { useUpdateMedicalRecord } from '../../../Hooks/JokkoHealth/useMedical';
import './PatientCard.module.css';
import axios from 'axios'; // Importez axios pour faire des requêtes HTTP
import $ from 'jquery'; // jQuery est requis pour bootstrap-notify
import 'bootstrap-notify'; // Importer bootstrap-notify
import 'animate.css'; // Importer animate.css pour les animations

const DetailPatient = ({ patient, isModalOpen }) => {
  const [formData, setFormData] = useState({ ...patient });
  const [macAddress, setMacAddress] = useState('');
  const [sensorData, setSensorData] = useState(null); // État pour les données du capteur
  const [errorMessage, setErrorMessage] = useState('');
  const updateMedicalRecordMutation = useUpdateMedicalRecord();

  // Fonction pour récupérer les données du capteur en fonction du dossier médical
  const fetchSensorData = async () => {
    try {
      const response = await axios.get(`/sensorPatient/sensorPoul/${patient.recordId}`);
      setSensorData(response.data); // Mettre à jour directement les données du capteur
      setMacAddress(response.data.mac); // Mettre à jour l'adresse MAC
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données du capteur :", error);
    }
  };

  // Fonction pour récupérer les dernières données du capteur
  const fetchLatestSensorData = async () => {
    try {
      const response = await axios.get('/sensorPatient/sensorPoul/latest');
      const { macAddress } = response.data;
      setMacAddress(macAddress); // Mettre à jour l'adresse MAC dans l'état
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données du capteur :", error);
    }
  };

  const handleAssignSensor = async () => {
    try {
      if (!macAddress) {
        throw new Error("Adresse MAC non définie");
      }

      const response = await axios.post('/sensorPatient/assignSensorToUser', {
        macAddress: macAddress,
        recordId: patient.recordId, // Utiliser l'ID du dossier médical
      });

      // Mettre à jour les données du patient avec le dossier médical renvoyé
      setFormData(response.data.medicalRecord);

      // Afficher une notification de succès
      $.notify({
        icon: 'fa fa-check', // Icône de succès
        title: 'Succès', // Titre de la notification
        message: response.data.message, // Message de succès renvoyé par le serveur
      }, {
        type: 'success', // Type de notification (success, info, warning, danger)
        placement: {
          from: 'top', // Position verticale (top ou bottom)
          align: 'right' // Position horizontale (left, right, center)
        },
        delay: 3000, // Durée d'affichage de la notification (en millisecondes)
        animate: {
          enter: 'animated fadeInRight', // Animation d'entrée
          exit: 'animated fadeOutRight' // Animation de sortie
        }
      });

      setErrorMessage(''); // Effacer les erreurs précédentes
    } catch (error) {
      console.error("❌ Erreur lors de l'assignation du capteur :", error);

      // Afficher une notification d'erreur
      $.notify({
        icon: 'fa fa-times', // Icône d'erreur
        title: 'Erreur', // Titre de la notification
        message: error.response?.data?.message || error.message || "Une erreur inattendue s'est produite.", // Message d'erreur
      }, {
        type: 'danger', // Type de notification (danger pour les erreurs)
        placement: {
          from: 'top', // Position verticale (top ou bottom)
          align: 'right' // Position horizontale (left, right, center)
        },
        delay: 5000, // Durée d'affichage de la notification (en millisecondes)
        animate: {
          enter: 'animated fadeInRight', // Animation d'entrée
          exit: 'animated fadeOutRight' // Animation de sortie
        }
      });

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Afficher le message d'erreur du serveur
      } else {
        setErrorMessage(error.message || "Une erreur inattendue s'est produite.");
      }
    }
  };

  // Utiliser un intervalle pour mettre à jour les données toutes les secondes
  useEffect(() => {
    let intervalId;

    if (isModalOpen) {
      fetchSensorData();
      fetchLatestSensorData();

      // Configurer un intervalle pour appeler fetchSensorData toutes les secondes
      intervalId = setInterval(fetchSensorData, 1000);
    } else {
      setMacAddress('');
      setSensorData(null); // Réinitialiser les données du capteur
      setErrorMessage('');
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMedicalRecordMutation.mutate({ id: patient.recordId, updates: formData });
  };

  // Couleurs personnalisées
  const colors = {
    primary: '#409D9B',
    secondary: '#034561',
    text: '#4A4A4A'
  };

  // Déterminer la couleur de l'état
  const getStatusColor = (value, min, max) => {
    if (value < min || value > max) {
      return 'text-danger'; // Rouge pour anormal
    } else if (value >= min && value <= max) {
      return 'text-success'; // Vert pour normal
    } else {
      return 'text-warning'; // Jaune pour constant
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '800px' }}>
      {/* En-tête */}
      <div className="mb-4">
        <h1 style={{ color: colors.primary, fontWeight: '600' }}>{`${formData.prenom} ${formData.nom}`}</h1>
        <p className="text-muted">Patient</p>
        <p className="text-muted">{formData.telephone}</p>
      </div>

      {/* Section Informations personnelles */}
      <form onSubmit={handleSubmit}>
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-4" style={{ color: colors.primary }}>Informations personnelles</h5>
            
            <div className="row">
              {/* Colonne gauche */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label text-secondary small">Âge</label>
                  <input 
                    type="number" 
                    className="form-control bg-light border-0" 
                    name="age"
                    value={formData.age || ''} 
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Chirurgie</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0" 
                    name="chirurgie"
                    value={formData.chirurgie || ''} 
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Statut</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0" 
                    name="status"
                    value={formData.status || ''} 
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Colonne droite */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label text-secondary small">Poids</label>
                  <input 
                    type="number" 
                    className="form-control bg-light border-0" 
                    name="poids"
                    value={formData.poids || ''} 
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Groupe Sanguin</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0" 
                    name="groupeSanguin"
                    value={formData.groupeSanguin || ''} 
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Hospitalisation</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0" 
                    name="hospitalisation"
                    value={formData.hospitalisation || ''} 
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Prescription */}
            <div className="mt-4 pt-3 border-top">
              <label className="form-label text-secondary small">Prescription</label>
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                name="antecedentsFamiliaux"
                value={formData.antecedentsFamiliaux || ''} 
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <button 
          type="submit"
          className="btn w-100 mt-4 py-3 text-white" 
          style={{ 
            backgroundColor: colors.primary,
            transition: 'all 0.3s'
          }}
        >
          <FontAwesomeIcon icon={faStethoscope} className="me-2" />
          Mettre à jour
        </button>

        {/* Adresse MAC */}
        <div className="mb-3">
          <label className="form-label text-secondary small">Adresse MAC</label>
          <input 
            type="text" 
            className="form-control bg-light border-0" 
            name="macAddress"
            value={macAddress} 
            readOnly // Empêcher la modification manuelle
          />
          {errorMessage && (
            <div className="text-danger small mt-2">{errorMessage}</div> // Afficher le message d'erreur
          )}
        </div>

        {/* Bouton Assigner */}
        <button 
          type="button" 
          className="btn btn-secondary mt-2"
          onClick={handleAssignSensor}
        >
          Assigner le capteur
        </button>
      </form>

      {/* Section Données vitales */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h5 className="mb-4" style={{ color: colors.primary }}>Données vitales en temps réel</h5>
          
          <div className="row g-4">
            {/* Carte 1 - Fréquence cardiaque */}
            <div className="col-md-4">
              <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                <FontAwesomeIcon 
                  icon={faHeartbeat} 
                  className="mb-3" 
                  style={{ color: colors.primary, fontSize: '1.5rem' }} 
                />
                <h6 className="text-secondary small mb-2">Fréquence cardiaque</h6>
                <div className="d-flex align-items-end">
                  <h3 className={`mb-0 me-2 ${sensorData ? getStatusColor(sensorData.heartRate, 60, 100) : ''}`}>
                    {sensorData ? sensorData.heartRate : 'N/A'}
                  </h3>
                  <span className={`small ${sensorData ? getStatusColor(sensorData.heartRate, 60, 100) : ''}`}>
                    {sensorData && sensorData.heartRate >= 60 && sensorData.heartRate <= 100 ? 'Normal' : 'Anormal'}
                  </span>
                </div>
                <div className="text-muted small mt-1">BPM</div>
              </div>
            </div>

            {/* Carte 2 - Température */}
            <div className="col-md-4">
              <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                <FontAwesomeIcon 
                  icon={faThermometerHalf} 
                  className="mb-3" 
                  style={{ color: colors.primary, fontSize: '1.5rem' }} 
                />
                <h6 className="text-secondary small mb-2">Température</h6>
                <div className="d-flex align-items-end">
                  <h3 className="mb-0 me-2" style={{ color: colors.secondary }}>35°C</h3>
                  <span className="text-success small">Normal</span>
                </div>
                <div className="text-muted small mt-1">Corporelle</div>
              </div>
            </div>

            {/* Carte 3 - Saturation O2 */}
            <div className="col-md-4">
              <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                <FontAwesomeIcon 
                  icon={faTint} 
                  className="mb-3" 
                  style={{ color: colors.primary, fontSize: '1.5rem' }} 
                />
                <h6 className="text-secondary small mb-2">Saturation O2</h6>
                <div className="d-flex align-items-end">
                  <h3 className={`mb-0 me-2 ${sensorData ? getStatusColor(sensorData.spo2, 95, 100) : ''}`}>
                    {sensorData ? sensorData.spo2 : 'N/A'}
                  </h3>
                  <span className={`small ${sensorData ? getStatusColor(sensorData.spo2, 95, 100) : ''}`}>
                    {sensorData && sensorData.spo2 >= 95 ? 'Normal' : 'Anormal'}
                  </span>
                </div>
                <div className="text-muted small mt-1">%</div>
              </div>
            </div>
          </div>

          {/* Section Anomalies */}
          {sensorData && sensorData.anomalies && sensorData.anomalies.length > 0 && (
            <div className="mt-4">
              <h6 className="text-secondary small mb-2">Anomalies détectées</h6>
              <ul>
                {sensorData.anomalies.map((anomaly, index) => (
                  <li key={index} className="text-danger small">{anomaly}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPatient;

