import React from 'react';
import imagePath from '../../../assets/images/other-images/Administration_9.png'; // Import de l'image
import Formulaire from './Formulaire'; // Import du composant Formulaire

function Inscrire() {
  const divStyle = {
    backgroundImage: `url(${imagePath})`, // Utilisation du chemin importé
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  };

  return (
    <div style={divStyle}>
      <Formulaire />
    </div>
  );
}

export default Inscrire;
