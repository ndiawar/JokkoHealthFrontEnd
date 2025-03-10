import React from 'react';
import { Breadcrumbs } from "../../AbstractElements"; 
import CarteRv from './CarteRV'; 
import TableRV from './TableRV'; 

function Record() {


  return (
    <div className="container-fluid">
    <Breadcrumbs mainTitle="Mes Rendez-Vous" parent="RendezVous" title="Mes Rendez-Vous" />
      <header style={{ textAlign: 'left', marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h2>Disponibilité du médecin</h2>
      </header>
      
      <CarteRv />
      <TableRV />
    </div>
  );
}

export default Record;