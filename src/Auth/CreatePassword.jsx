import React, { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import logo from '../../src/assets/images/other-images/Links.png';
import imagePath from '../../src/assets/images/other-images/Administration_9.png';
import { resetPassword } from "../api/auth"; // Importer la fonction pour réinitialiser le mot de passe
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css";

const CreatePassword = () => {
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [confirmPassword, setConfirmPassword] = useState(""); // État pour la confirmation du mot de passe
  const [passwordError, setPasswordError] = useState(""); // Erreur pour le mot de passe
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Erreur pour la confirmation
  const [isLoading, setIsLoading] = useState(false); // État de chargement
  const [showPassword, setShowPassword] = useState(false); // Afficher/Masquer le mot de passe
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Afficher/Masquer la confirmation du mot de passe
  const [token, setToken] = useState(null); // Token pour la réinitialisation
  const [id, setId] = useState(null); // ID de l'utilisateur

  useEffect(() => {
    // Récupérer le token et l'ID à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get("token"));
    setId(urlParams.get("id"));
  }, []);

  // Valider le mot de passe
  const validatePassword = (value) => {
    setPasswordError(value.length >= 6 ? "" : "Le mot de passe doit contenir au moins 6 caractères !");
  };

  // Valider la confirmation du mot de passe
  const validateConfirmPassword = (value) => {
    setConfirmPasswordError(value === password ? "" : "Les mots de passe ne correspondent pas !");
  };

  // Gérer le changement du mot de passe
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  // Gérer le changement de la confirmation du mot de passe
  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  // Gérer la soumission du formulaire
  const handleCreatePassword = async (e) => {
    e.preventDefault();

    // Vérifier si des erreurs existent
    if (passwordError || confirmPasswordError) {
      toast.error("Veuillez corriger les erreurs avant de continuer !");
      return;
    }

    if (!token || !id) {
      toast.error("Le token ou l'ID est manquant !");
      return;
    }

    setIsLoading(true);
    try {
      // Appeler la fonction de réinitialisation du mot de passe
      await resetPassword(token, id, password, confirmPassword);
      toast.success("Votre mot de passe a été réinitialisé avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la réinitialisation du mot de passe !");
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
          <h2 className="signin-title">Créer votre mot de passe</h2>
          <p className="text-dark">Entrez un nouveau mot de passe et confirmez-le</p>
          <form onSubmit={handleCreatePassword} className="signin-form">
            {/* Champ Nouveau Mot de Passe */}
            <div className="input-group">
              <label htmlFor="password">Nouveau Mot de Passe</label>
              <div className="input-wrapper">
                <FaLock className="input-icon input-icon-left" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Nouveau Mot de Passe"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`input-field ${passwordError ? "input-error" : ""}`}
                />
                <span
                  className="input-icon input-icon-right"
                  onClick={() => setShowPassword(!showPassword)} // Basculer entre masqué et visible
                >
                  {showPassword ? (
                    <FaEyeSlash title="Cacher le mot de passe" />
                  ) : (
                    <FaEye title="Voir le mot de passe" />
                  )}
                </span>
              </div>
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>

            {/* Champ Confirmation Mot de Passe */}
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmer le Mot de Passe</label>
              <div className="input-wrapper">
                <FaLock className="input-icon input-icon-left" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmer le Mot de Passe"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`input-field ${confirmPasswordError ? "input-error" : ""}`}
                />
                <span
                  className="input-icon input-icon-right"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Basculer entre masqué et visible
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash title="Cacher le mot de passe" />
                  ) : (
                    <FaEye title="Voir le mot de passe" />
                  )}
                </span>
              </div>
              {confirmPasswordError && <span className="error-message">{confirmPasswordError}</span>}
            </div>

            {/* Bouton de soumission */}
            <button type="submit" className="signin-button" disabled={isLoading}>
              {isLoading ? "Création en cours..." : "Créer le mot de passe"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default CreatePassword;
