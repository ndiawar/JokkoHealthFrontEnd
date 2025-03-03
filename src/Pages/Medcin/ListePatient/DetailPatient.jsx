import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faTint, faThermometerHalf, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { useUpdateMedicalRecord } from '../../../Hooks/JokkoHealth/useMedical';
import './PatientCard.module.css';

const PatientCard = ({ patient }) => {
  const [formData, setFormData] = useState({ ...patient });
  const updateMedicalRecordMutation = useUpdateMedicalRecord();

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
                  <h3 className="mb-0 me-2" style={{ color: colors.secondary }}>98</h3>
                  <span className="text-success small">Normal</span>
                </div>
                <div className="text-muted small mt-1">72 mmig</div>
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
                  <h3 className="mb-0 me-2" style={{ color: colors.secondary }}>95%</h3>
                  <span className="text-success small">Normal</span>
                </div>
                <div className="text-muted small mt-1">Niveau</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;