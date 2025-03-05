import React, { useState, useEffect, Fragment } from 'react'; // Import React, hooks, and Fragment
import DataTable from 'react-data-table-component'; // Import DataTable
import { getAppointments } from '../../api/appointment'; // Import getAppointments
import axios from 'axios'; // Import axios

// Define tableColumns (if not imported from another file)
const tableColumns = [
    {
        name: 'Spécialité',
        selector: row => row.specialite,
        sortable: true,
    },
    {
        name: 'Téléphone',
        selector: row => row.telephone,
        sortable: true,
    },
    {
        name: 'Date de disponibilité',
        selector: row => row.date,
        sortable: true,
    },
    {
        name: 'Heure',
        selector: row => row.heure,
        sortable: true,
    },
    {
        name: 'Demande',
        cell: row => (
            <span className={`badge ${
                row.demande === 'en attente' ? 'bg-warning' :
                row.demande === 'rejeté' ? 'bg-danger' :
                'bg-success'
            }`}>
                {row.demande}
            </span>
        ),
        sortable: true,
    },
];

const TableRV = ({ selectedAppointmentId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [patientId, setPatientId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users/me', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setPatientId(response.data._id);
            } catch (err) {
                console.error('Erreur lors de la récupération des informations utilisateur:', err);
                setError('Erreur lors de la récupération des informations utilisateur.');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (patientId) {
            const fetchAppointments = async () => {
                try {
                    const appointments = await getAppointments();
                    const formattedData = appointments.map(appointment => ({
                        id: appointment._id,
                        specialite: appointment.specialiste,
                        telephone: appointment.doctorId.telephone,
                        date: new Date(appointment.date).toLocaleDateString(),
                        heure: `${appointment.heure_debut} - ${appointment.heure_fin}`,
                        demande: appointment.statutDemande,
                    }));
                    setData(formattedData);
                } catch (err) {
                    setError("Impossible de récupérer les rendez-vous.");
                } finally {
                    setLoading(false);
                }
            };
            fetchAppointments();
        }
    }, [patientId]);

    const handleRowSelected = state => {
        setSelectedRows(state.selectedRows);
    };

    const conditionalRowStyles = [
        {
            when: row => row.id === selectedAppointmentId,
            style: {
                backgroundColor: '#f8f9fa',
                fontWeight: 'bold',
            },
        },
    ];

    if (loading) return <p>Chargement des rendez-vous...</p>;
    if (error) return <p>{error}</p>;
    if (!patientId) return <p>Veuillez vous connecter pour voir vos rendez-vous.</p>;

    return (
        <Fragment>
            <h2 style={{ textAlign: 'left', marginTop: '20px', paddingLeft: '10px' }}>Mes Rendez-vous</h2>
            <div className="table-responsive">
                <DataTable
                    data={data}
                    columns={tableColumns}
                    striped={true}
                    pagination
                    onSelectedRowsChange={handleRowSelected}
                    conditionalRowStyles={conditionalRowStyles}
                    selectableRows
                    selectableRowsSingle // Permettre la sélection d'une seule ligne
                    selectableRowSelected={row => row.id === selectedAppointmentId} // Sélectionner la ligne correspondante
                />
            </div>
        </Fragment>
    );
};

export default TableRV;