import React, { Fragment, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomizerContext from "../_helper/Customizer";
import imagePath from '../../src/assets/images/other-images/Administration_9.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import logo from '../../src/assets/images/other-images/Links.png';

const Signin = ({ selected }) => {
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  
  // État local pour les champs de saisie et les erreurs
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Veuillez entrer un email valide !");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères !");
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const loginAuth = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      toast.error("Veuillez corriger les erreurs avant de vous connecter !");
      return;
    }

    // Vérification de l'email unique
    if (email === "test@gmail.com" && password === "test123") {
      localStorage.setItem("login", JSON.stringify(true));
      history(`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`);
      toast.success("Successfully logged in!..");
    } else {
      toast.error("Vous avez entré un mauvais mot de passe ou un nom d'utilisateur !");
    }
  };

  const divStyle = {
    backgroundImage: `url(${imagePath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexDirection: 'column'
  };

  const headerStyle = {
    width: '100%',
    backgroundColor: 'white',
    padding: '10px 0',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
  };

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '600px',
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const inputGroupStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '20px',
  };

  const labelStyle = {
    color: '#8C8C8C',
    marginBottom: '5px',
    fontSize: '14px',
  };

  const iconStyle = {
    position: 'absolute',
    left: '10px',  // Ajuste l'icône pour mieux s'intégrer
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#409D9B',
    pointerEvents: 'none',
    zIndex: 1,  // Icône derrière le texte
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px 40px 10px 30px',  // S'assurer qu'il y a assez de place pour l'icône
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s',
    borderColor: emailError || passwordError ? 'red' : '#ccc',
    zIndex: 2,  // S'assurer que le champ de texte reste au-dessus de l'icône
  };
  
  return (
    <Fragment>
      <div style={divStyle}>
        <div style={headerStyle}>
          <img src={logo} alt="Logo" style={{ maxHeight: '50px' }} />
        </div>
        <div style={formContainerStyle}>
          <h2 style={{ textAlign: 'left', color: 'black', marginBottom: '80px', width: '100%', marginTop: '0', marginLeft: '0' }}>Connexion</h2>
          <form onSubmit={loginAuth} style={{ width: '100%' }}>
            <div style={inputGroupStyle}>
              <label htmlFor="email" style={labelStyle}>Email</label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={iconStyle} />
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  style={inputStyle}
                />
                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
              </div>
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="password" style={labelStyle}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <FaLock style={iconStyle} />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  style={inputStyle}
                />
                {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
              </div>
            </div>
            <div style={{ textAlign: 'right', marginBottom: '20px', width: '100%' }}>
              <a href="/forgot-password" style={{ color: '#409D9B' }}>Mot de passe oublié ?</a>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', backgroundColor: '#409D9B', border: 'none', borderRadius: '5px', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
              Se Connecter
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
