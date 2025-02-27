import React from 'react';

function Inscrire() {
  const divStyle = {
    backgroundImage: 'url("../../../../assets/images/other-images/Administration_9.png")', // Chemin relatif vers l'image
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
      <h1>test</h1>
    </div>
  );
}

export default Inscrire;