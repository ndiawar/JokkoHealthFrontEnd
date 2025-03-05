import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from "../../AbstractElements";
import CarteRv from './CarteRV';
import TableRV from './TableRV';

function Record() {
    const [appointmentsUpdated, setAppointmentsUpdated] = useState(false);
    const [showTable, setShowTable] = useState(() => {
        return localStorage.getItem('showTable') === 'true';
    });
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [appointments, setAppointments] = useState([]); // Nouvel état pour stocker les rendez-vous

    useEffect(() => {
        localStorage.setItem('showTable', showTable);
    }, [showTable]);

    const handleAppointmentAdded = (appointmentId) => {
        setAppointmentsUpdated(prev => !prev);
        setShowTable(true);
        setSelectedAppointmentId(appointmentId);
    };

    const handleAppointmentsFetched = (filteredAppointments) => {
        setAppointments(filteredAppointments); // Mettre à jour la liste des rendez-vous
    };

    return (
        <div className="container-fluid">
            <Breadcrumbs parent="Dashboard" title="Rendez-vous" />
            <header style={{ textAlign: 'left', marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                <h2>Disponibilité du médecin</h2>
            </header>

            <CarteRv
                onAppointmentAdded={handleAppointmentAdded}
                onAppointmentsFetched={handleAppointmentsFetched} // Passer la fonction de rappel
            />
            {showTable && appointments.length > 0 && ( // Afficher le tableau uniquement s'il y a des rendez-vous
                <TableRV key={appointmentsUpdated} selectedAppointmentId={selectedAppointmentId} />
            )}
        </div>
    );
}

export default Record;