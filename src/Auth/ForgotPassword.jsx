import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope } from 'react-icons/fa';
import logo from '../../src/assets/images/other-images/Links.png';
import imagePath from '../../src/assets/images/other-images/Administration_9.png';
import { forgotPassword } from "../api/auth"; // Assurez-vous d'avoir cette fonction dans votre API
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour valider l'email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Veuillez entrer un email valide !");
  };

  // Gestion du changement de saisie
  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value); // Valider l'email à chaque changement
  };

  // Fonction pour envoyer le lien de réinitialisation de mot de passe
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Vérification si l'email est valide avant d'envoyer la requête
    if (emailError || !email) {
      toast.error("Veuillez entrer un email valide avant de continuer !");
      return;
    }

    setIsLoading(true);
    try {
      // Envoi directement de l'email sans entourer dans un objet
      await forgotPassword(email); 
      toast.success("Un lien de réinitialisation de mot de passe a été envoyé à votre adresse email !");
    } catch (error) {
      toast.error("Erreur lors de l'envoi du lien de réinitialisation de mot de passe !");
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
          <h2 className="signin-title">Mot de passe oublié</h2>
          <form onSubmit={handlePasswordReset} className="signin-form">
            <p className="text-dark">Veuillez indiquer un e-mail correct pour pouvoir changer de mot de passe</p>
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

            {/* Bouton pour envoyer le lien de réinitialisation */}
            <button type="submit" className="signin-button" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default ForgotPassword;
