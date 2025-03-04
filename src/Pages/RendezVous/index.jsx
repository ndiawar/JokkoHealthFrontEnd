import React, { useState } from 'react';
import { Breadcrumbs } from "../../AbstractElements"; 
import CarteRv from './CarteRV'; 
import TableRV from './TableRV'; 

function Record() {
  const [appointmentsUpdated, setAppointmentsUpdated] = useState(false);
  const [showTable, setShowTable] = useState(false); // État pour gérer l'affichage du tableau

  const handleAppointmentAdded = (appointmentId) => {
    setAppointmentsUpdated(prev => !prev); // Déclenche la mise à jour du tableau
    setShowTable(true); // Affiche le tableau après ajout
  };

  return (
    <div className="container-fluid">
      <Breadcrumbs parent="Dashboard" title="Rendez-vous" />
      <header style={{ textAlign: 'left', marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h2>Disponibilité du médecin</h2>
      </header>
      
      <CarteRv onAppointmentAdded={handleAppointmentAdded} /> {/* Passer le callback ici */}
      {showTable && <TableRV key={appointmentsUpdated} />} {/* Affichez le tableau seulement si showTable est true */}
    </div>
  );
}

export default Record;