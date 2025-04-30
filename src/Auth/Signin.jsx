import React, { Fragment, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import imagePath from '../../src/assets/images/other-images/Administration_9.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import logo from '../../src/assets/images/other-images/Links.png';
import { loginUser } from "../api/users";
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css";
import CustomizerContext from "../_helper/Customizer";
import Cookies from 'js-cookie';

const Signin = () => {
  // const navigate = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Fonction pour valider l'email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Veuillez entrer un email valide !");
  };

  // Fonction pour valider le mot de passe
  const validatePassword = (value) => {
    setPasswordError(value.length < 8 ? "Le mot de passe doit contenir au moins 8 caractères !" : "");
  };

  // Gestion du changement de saisie
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      validateEmail(value);
    } else if (name === "password") {
      setPassword(value);
      validatePassword(value);
    }
  };

  // Fonction de connexion
  const loginAuth = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      toast.error("Veuillez corriger les erreurs avant de vous connecter !");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser({ email, motDePasse: password });
      console.log('Réponse de connexion:', response);
      const { user, token } = response;
      console.log('Rôle de l\'utilisateur:', user.role);

      // Stocker le token et le rôle dans les cookies
      Cookies.set('jwt', token, { expires: 1 });
      Cookies.set('userRole', user.role, { expires: 1 });
      
      // Mettre à jour l'état d'authentification dans le localStorage
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('login', 'true');
      localStorage.setItem('user', JSON.stringify(user));

      // Définir le chemin de redirection en fonction du rôle
      let redirectPath;
      switch (user.role) {
        case 'SuperAdmin':
          redirectPath = `${process.env.PUBLIC_URL}/pages/admin/dashboard/${layoutURL}`;
          break;
        case 'Medecin':
          redirectPath = `${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`;
          break;
        case 'Patient':
          redirectPath = `${process.env.PUBLIC_URL}/dashboard/patient/${layoutURL}`;
          break;
        default:
          toast.error("Rôle utilisateur non reconnu !");
          return;
      }

      console.log('Tentative de redirection vers:', redirectPath);
      
      // Forcer la navigation avec window.location
      window.location.href = redirectPath;
      
      toast.success("Connexion réussie !");
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setLoginError(error.response?.data?.message || "Erreur lors de la connexion");
      toast.error("Vous avez entré un mauvais mot de passe ou un nom d'utilisateur !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="signin-container" style={{ backgroundImage: `url(${imagePath})` }}>
        <div className="signin-header">
          <img src={logo} alt="Logo" className="signin-logo" />
        </div>
        <div className="signin-form-container">
          <h2 className="signin-title">Connexion</h2>
          <form onSubmit={loginAuth} className="signin-form">
            {/* Champ Email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleInputChange}
                  className={`input-field ${emailError ? "input-error" : ""}`}
                />
              </div>
              {emailError && <span className="error-message">{emailError}</span>}
            </div>

            {/* Champ Mot de Passe */}
            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={handleInputChange}
                  className={`input-field ${passwordError ? "input-error" : ""}`}
                />
              </div>
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>

            {/* Lien mot de passe oublié */}
            <div className="forgot-password">
              <a href="/forgot-password">Mot de passe oublié ?</a>
            </div>

            {/* Message d'erreur global */}
            {loginError && <div className="error-message">{loginError}</div>}

            {/* Bouton de connexion */}
            <button type="submit" className="signin-button" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se Connecter"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;