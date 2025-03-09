import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaUserShield, FaUserAlt } from 'react-icons/fa';
import { useRegisterUser } from '../../../Hooks/JokkoHealth/useUsers';
import { getCurrentUser } from '../../../Services/Auth'; // Importer la fonction pour obtenir l'utilisateur connecté

function Formulaire() {
  // États du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    password: '',
    role: '',  // initialement vide
    dateNaissance: '',
    sexe: '',  // Ajout du sexe
    adresse: ''
  });

  // États pour la gestion des erreurs et validations
  const [serverError, setServerError] = useState(null);
  const [errors, setErrors] = useState({
    telephone: '',
    email: '',
    nom: '',
    prenom: '',
    password: '',
    sexe: '',  // Validation du sexe
    required: false,
  });

  // Hook d'inscription
  const { mutate: register, isLoading } = useRegisterUser();

  // Vérifier le rôle de l'utilisateur connecté et ajuster le rôle dans le formulaire
  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === 'Medecin') {
      // Si l'utilisateur est médecin, on définit directement le rôle à "Patient" et désactive le champ
      setFormData(prev => ({ ...prev, role: 'Patient' }));
    }
  }, []);

  // Fonctions de validation
  const validations = {
    email: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    telephone: (value) => /^(77|78|76|70|75)[0-9]{7}$/.test(value),
    nom: (value) => value.length >= 2,
    prenom: (value) => value.length >= 2,
    password: (value) => value.length >= 8,
    sexe: (value) => ['Homme', 'Femme', 'Autre'].includes(value),  // Validation du sexe
  };

  // Messages d'erreur
  const errorMessages = {
    email: 'Format d\'email invalide',
    telephone: 'Format invalide (ex: 77XXXXXXX)',
    nom: 'Le nom doit avoir au moins 2 caractères',
    prenom: 'Le prénom doit avoir au moins 2 caractères',
    password: 'Le mot de passe doit avoir au moins 8 caractères',
    sexe: 'Veuillez sélectionner un sexe',  // Message d'erreur pour le sexe
  };

  // Gestionnaire de changement des champs
  const handleChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('exampleInput', '').toLowerCase();

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    setServerError(null);
    setErrors(prev => ({ ...prev, required: false }));

    if (validations[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: value && !validations[field](value) ? errorMessages[field] : ''
      }));
    }
  };

  // Gestionnaire de changement du rôle
  const handleRoleChange = (e) => {
    if (getCurrentUser()?.role !== 'Medecin') {
      setFormData(prev => ({ ...prev, role: e.target.value }));
    }
  };

  // Gestionnaire de soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // Vérification des champs requis
    const requiredFields = ['prenom', 'nom', 'telephone', 'email', 'role', 'sexe'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setErrors(prev => ({ ...prev, required: true }));
      return;
    }

    // Vérification des erreurs de validation
    const hasValidationErrors = Object.values(errors).some(error => error);
    if (hasValidationErrors) return;

    try {
      await register({
        ...formData,
        dateNaissance: formData.dateNaissance || undefined,
        sexe: formData.sexe || undefined,
        adresse: formData.adresse || undefined
      }, {
        onSuccess: () => {
          // Réinitialisation du formulaire après succès
          setFormData({
            prenom: '',
            nom: '',
            telephone: '',
            email: '',
            password: '',
            role: '',
            dateNaissance: '',
            sexe: '', // Réinitialiser le sexe
            adresse: ''
          });
        },
        onError: (error) => {
          setServerError(error.response?.data?.message || 'Une erreur est survenue');
        }
      });
    } catch (error) {
      setServerError('Une erreur est survenue lors de l\'inscription');
    }
  };

  // Styles
  const styles = {
    formContainer: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      width: '550px',
      margin: 'auto',
    },
    title: {
      textAlign: 'left',
      color: 'black',
      marginBottom: '20px',
    },
    label: {
      color: '#8C8C8C',
    },
    icon: {
      position: 'absolute',
      left: '10px',
      top: '10px',
      color: '#8C8C8C',
    },
    select: {
      appearance: 'none',
      backgroundColor: '#fff',
      border: '1px solid #ced4da',
      borderRadius: '0.25rem',
      padding: '0.375rem 2.25rem 0.375rem 40px',
      width: '100%',
    },
    error: {
      color: 'red',
      fontSize: '0.875rem',
      marginTop: '0.25rem'
    },
    serverError: {
      backgroundColor: '#fff3f3',
      color: '#dc3545',
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem'
    }
  };

  const isFormValid = 
    formData.prenom && 
    formData.nom && 
    formData.telephone && 
    formData.email && 
    formData.role && 
    formData.sexe &&  // Assurez-vous que le sexe est sélectionné
    !Object.values(errors).some(Boolean);

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Inscription</h2>

      {serverError && (
        <div style={styles.serverError}>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {errors.required && (
          <div style={styles.error}>
            Tous les champs marqués * sont obligatoires
          </div>
        )}

        {/* Rôle */}
        <div className="mb-3">
          <label htmlFor="exampleInputRole" className="form-label" style={styles.label}>
            Rôle *
          </label>
          <div style={{ position: 'relative' }}>
            <FaUserShield style={styles.icon} />
            <select
              className="form-control"
              id="exampleInputRole"
              value={formData.role}
              onChange={handleRoleChange}
              style={styles.select}
              disabled={getCurrentUser()?.role === 'Medecin'} // Si l'utilisateur est médecin, on désactive le champ
            >
              {getCurrentUser()?.role === 'Medecin' ? (
                <option value="Patient">Patient</option>  // Le rôle est automatiquement "Patient"
              ) : (
                <>
                  <option value="">Sélectionnez un rôle</option>
                  <option value="Patient">Patient</option>
                  <option value="Medecin">Médecin</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Prénom */}
        <div className="mb-3">
          <label htmlFor="exampleInputPrenom" className="form-label" style={styles.label}>
            Prénom *
          </label>
          <div style={{ position: 'relative' }}>
            <FaUser style={styles.icon} />
            <input
              type="text"
              className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
              id="exampleInputPrenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Entrez le prénom"
              style={{ paddingLeft: '40px' }}
            />
            {errors.prenom && <div style={styles.error}>{errors.prenom}</div>}
          </div>
        </div>

        {/* Nom */}
        <div className="mb-3">
          <label htmlFor="exampleInputNom" className="form-label" style={styles.label}>
            Nom *
          </label>
          <div style={{ position: 'relative' }}>
            <FaUser style={styles.icon} />
            <input
              type="text"
              className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
              id="exampleInputNom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Entrez le nom"
              style={{ paddingLeft: '40px' }}
            />
            {errors.nom && <div style={styles.error}>{errors.nom}</div>}
          </div>
        </div>

        {/* Téléphone */}
        <div className="mb-3">
          <label htmlFor="exampleInputTelephone" className="form-label" style={styles.label}>
            Téléphone *
          </label>
          <div style={{ position: 'relative' }}>
            <FaPhone style={styles.icon} />
            <input
              type="tel"
              className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
              id="exampleInputTelephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="77XXXXXXX"
              style={{ paddingLeft: '40px' }}
            />
            {errors.telephone && <div style={styles.error}>{errors.telephone}</div>}
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label" style={styles.label}>
            Email *
          </label>
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="exampleInputEmail"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              style={{ paddingLeft: '40px' }}
            />
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>
        </div>

        {/* Sexe */}
        <div className="mb-3">
          <label htmlFor="exampleInputSexe" className="form-label" style={styles.label}>
            Sexe *
          </label>
          <div style={{ position: 'relative' }}>
            <FaUserAlt style={styles.icon} /> {/* Icône pour le sexe */}
            <select
              className="form-control"
              id="exampleInputSexe"
              value={formData.sexe}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Sélectionnez un sexe</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
            {errors.sexe && <div style={styles.error}>{errors.sexe}</div>}
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
}

export default Formulaire;