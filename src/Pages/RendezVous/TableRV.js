import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAppointments } from '../../api/appointment';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
            <span className={`badge ${row.demande === 'En attente' ? 'bg-warning' : 'bg-success'}`}>
                {row.demande}
            </span>
        ),
        sortable: true,
    },
];

const TableRV = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [patientId, setPatientId] = useState(null); // L'ID du patient

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Si vous utilisez un token d'authentification
                    }
                });
                setPatientId(response.data._id);  // Mettre à jour l'ID du patient
            } catch (err) {
                console.error('Erreur lors de la récupération des informations utilisateur:', err);
                setError('Erreur lors de la récupération des informations utilisateur.');
            }
        };

        fetchUserData(); // Récupérer l'ID de l'utilisateur
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
                        demande: 'En attente', // Valeur par défaut
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
        setSelectedRows(state.selectedRows);  // Mise à jour de selectedRows
    };

    if (loading) return <p>Chargement des rendez-vous...</p>;
    if (error) return <p>{error}</p>;
    if (!patientId) return <p>Veuillez vous connecter pour voir vos rendez-vous.</p>; // Vérifier si l'utilisateur est connecté

    return (
        <Fragment>
            <h2 style={{ textAlign: 'left', marginTop: '20px', paddingLeft: '10px' }}>Mes Rendez-vous</h2>
            <div className="table-responsive">
                <DataTable
                    data={data}
                    columns={tableColumns}
                    striped={true}
                    pagination
                    onSelectedRowsChange={handleRowSelected}  // Passer la fonction de gestion des lignes sélectionnées
                />
            </div>
        </Fragment>
    );
};

export default TableRV;
