import React from 'react';
import { Breadcrumbs } from "../../AbstractElements"; // Importer Breadcrumbs
import CarteRv from './CarteRV'; // Importez le composant CarteRv
import TableRV from './TableRV'; // Importez le composant TableRV

function Record() {
  return (
    <div className="container-fluid">
      <Breadcrumbs  parent="Dashboard" title="Rendez-vous" /> {/* Ajouter Breadcrumbs */}
      {/* Header */}
      <header style={{ textAlign: 'left', marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h2>Disponibilité du médecin</h2>
      </header>

      {/* Appel du composant CarteRv pour afficher les cartes */}
      <CarteRv />

      {/* Appel du composant TableRV pour afficher le tableau des rendez-vous */}
      <TableRV />
    </div>
  );
}

export default Record;