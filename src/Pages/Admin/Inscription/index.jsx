import React from 'react';
import Formulaire from './Formulaire'; // Remplacez par le bon chemin relatif si nécessaire
import imagePath from '../../../assets/images/other-images/Administration_9.png'; // Importer l'image

function Inscrire() {
  const divStyle = {
    backgroundImage: `url(${imagePath})`, // Utilisation de l'image importée
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Hauteur de l'écran
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white' // Couleur du texte pour le contraste
  };

  return (
    <div style={divStyle}>
      <Formulaire /> {/* Utilisation du composant Formulaire ici */}
    </div>
  );
}

export default Inscrire;
