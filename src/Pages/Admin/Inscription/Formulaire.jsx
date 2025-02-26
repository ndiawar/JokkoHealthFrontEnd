import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';

function Formulaire() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [checked, setChecked] = useState(false);

  const [errors, setErrors] = useState({
    telephone: '',
    email: '',
    nom: '',
    prenom: '',
    password: '',
    required: false,
  });

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateTelephone = (telephone) => {
    const regex = /^(77|78|76|70|75)[0-9]{7}$/; // Modèle pour les numéros sénégalais
    return regex.test(telephone);
  };

  const validateNom = (nom) => {
    return nom.length >= 4;
  };

  const validatePrenom = (prenom) => {
    return prenom.length >= 4;
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Clear error messages for real-time validation
    setErrors((prev) => ({ ...prev, required: false }));

    switch (id) {
      case 'exampleInputEmail1':
        setEmail(value);
        if (!validateEmail(value)) {
          setErrors((prev) => ({ ...prev, email: 'Email non valide.' }));
        } else {
          setErrors((prev) => ({ ...prev, email: '' }));
        }
        break;
      case 'exampleInputTelephone':
        setTelephone(value);
        if (!validateTelephone(value)) {
          setErrors((prev) => ({ ...prev, telephone: 'Numéro de téléphone non valide.' }));
        } else {
          setErrors((prev) => ({ ...prev, telephone: '' }));
        }
        break;
      case 'exampleInputNom':
        setNom(value);
        if (!validateNom(value)) {
          setErrors((prev) => ({ ...prev, nom: 'Le nom doit avoir au moins 4 caractères.' }));
        } else {
          setErrors((prev) => ({ ...prev, nom: '' }));
        }
        break;
      case 'exampleInputPrenom':
        setPrenom(value);
        if (!validatePrenom(value)) {
          setErrors((prev) => ({ ...prev, prenom: 'Le prénom doit avoir au moins 4 caractères.' }));
        } else {
          setErrors((prev) => ({ ...prev, prenom: '' }));
        }
        break;
      case 'exampleInputPassword1':
        setPassword(value);
        if (!validatePassword(value)) {
          setErrors((prev) => ({ ...prev, password: 'Le mot de passe doit avoir au moins 8 caractères.' }));
        } else {
          setErrors((prev) => ({ ...prev, password: '' }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prenom || !nom || !telephone || !email || !password || !role) {
      setErrors((prev) => ({ ...prev, required: true }));
      return;
    }

    if (errors.telephone || errors.email || errors.nom || errors.prenom || errors.password) {
      return;
    }

    console.log({ prenom, nom, telephone, email, password, role, checked });
  };

  // Vérification pour activer ou désactiver le bouton
  const isFormValid =
    prenom &&
    nom &&
    telephone &&
    email &&
    password &&
    role &&
    !errors.telephone &&
    !errors.email &&
    !errors.nom &&
    !errors.prenom &&
    !errors.password;

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '550px',
    margin: 'auto',
  };

  const titleStyle = {
    textAlign: 'left',
    color: 'black',
    marginBottom: '20px',
  };

  const labelStyle = {
    color: '#8C8C8C',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: isFormValid ? '#007bff' : '#B0B0B0', // Bleu si activé, gris alu si désactivé
    color: 'white', // Texte blanc
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: isFormValid ? 'pointer' : 'not-allowed', // Curseur adapté
    opacity: isFormValid ? 1 : 0.65, // Opacité réduite si désactivé
  };

  const selectStyle = {
    appearance: 'none',
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    padding: '0.375rem 2.25rem 0.375rem 40px',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'><polyline points='6 9 12 15 18 9' /></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.5rem center',
    backgroundSize: '1.5em',
    cursor: 'pointer',
  };

  const iconStyle = {
    position: 'absolute',
    left: '10px',
    top: '10px',
    color: '#8C8C8C',
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Inscrire</h2>
      <form onSubmit={handleSubmit}>
        {errors.required && <div style={{ color: 'red' }}>Tous les champs sont obligatoires.</div>}
        <div className="mb-3">
          <label htmlFor="exampleInputRole" className="form-label" style={labelStyle}>Rôle</label>
          <div style={{ position: 'relative' }}>
            <FaUserShield style={iconStyle} />
            <select
              className="form-control"
              id="exampleInputRole"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={selectStyle}
            >
              <option value="">Sélectionnez un rôle</option>
              <option value="Administrateur">Administrateur</option>
              <option value="Médecin">Médecin</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPrenom" className="form-label" style={labelStyle}>Prénom</label>
          <div style={{ position: 'relative' }}>
            <FaUser style={iconStyle} />
            <input
              type="text"
              className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
              id="exampleInputPrenom"
              value={prenom}
              onChange={handleChange}
              placeholder="Entrez le prénom"
              style={{ paddingLeft: '30px' }}
            />
            {errors.prenom && <div style={{ color: 'red' }}>{errors.prenom}</div>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputNom" className="form-label" style={labelStyle}>Nom</label>
          <div style={{ position: 'relative' }}>
            <FaUser style={iconStyle} />
            <input
              type="text"
              className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
              id="exampleInputNom"
              value={nom}
              onChange={handleChange}
              placeholder="Entrez le nom"
              style={{ paddingLeft: '30px' }}
            />
            {errors.nom && <div style={{ color: 'red' }}>{errors.nom}</div>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputTelephone" className="form-label" style={labelStyle}>Téléphone</label>
          <div style={{ position: 'relative' }}>
            <FaPhone style={iconStyle} />
            <input
              type="tel"
              className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
              id="exampleInputTelephone"
              value={telephone}
              onChange={handleChange}
              placeholder="Entrez le numéro de téléphone"
              style={{ paddingLeft: '30px', borderColor: errors.telephone ? 'red' : '' }}
            />
            {errors.telephone && <div style={{ color: 'red' }}>{errors.telephone}</div>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" style={labelStyle}>Email</label>
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={iconStyle} />
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="exampleInputEmail1"
              value={email}
              onChange={handleChange}
              placeholder="Entrez l'email"
              style={{ paddingLeft: '30px', borderColor: errors.email ? 'red' : '' }}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" style={labelStyle}>Mot de passe</label>
          <div style={{ position: 'relative' }}>
            <FaLock style={iconStyle} />
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="exampleInputPassword1"
              value={password}
              onChange={handleChange}
              placeholder="Entrez le mot de passe"
              style={{ paddingLeft: '30px' }}
            />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          </div>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" style={buttonStyle} disabled={!isFormValid}>
          Inscrire
        </button>
      </form>
    </div>
  );
}

export default Formulaire;