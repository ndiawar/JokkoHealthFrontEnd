import React, { Fragment, useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../AbstractElements';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAppointments from '../../Hooks/JokkoHealth/useAppointments';
const tableColumns = [
    {
        name: 'Spécialité',
        selector: row => row.specialiste, // Correction ici
        sortable: true,
        style: { flex: 1, padding: '0 10px' },
    },
    {
        name: 'Téléphone',
        selector: row => row.telephone || 'Non disponible', // Vérification si absent
        sortable: true,
        style: { flex: 1, padding: '0 10px' },
    },
    {
        name: 'Date de disponibilité',
        selector: row => new Date(row.date).toLocaleDateString(),
        sortable: true,
        style: { flex: 1, padding: '0 10px' },
    },
    {
        name: 'Heure',
        selector: row => `${row.heure_debut} - ${row.heure_fin}`,
        sortable: true,
        style: { flex: 1, padding: '0 10px' },
    },
    {
        name: 'Demande',
        cell: row => (
            <span className={`badge ${row.statutDemande === 'Accepté' ? 'bg-success' : 'bg-warning'}`}>
                {row.statutDemande}
            </span>
        ),
        sortable: true,
        style: { flex: 1, padding: '0 10px' },
    },
];


const TableRV = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [appointments, setAppointments] = useState([]);  // État local des rendez-vous
    const [toggleDelet, setToggleDelet] = useState(false);

    // Utilisation du hook personnalisé pour récupérer les rendez-vous
    const { appointments: fetchedAppointments, loading, error } = useAppointments();

    useEffect(() => {
        if (fetchedAppointments !== appointments) {  // Vérifier si les rendez-vous ont changé
            setAppointments(fetchedAppointments); // Mettre à jour uniquement si fetchedAppointments a changé
        }
    }, [fetchedAppointments, appointments]);  // Mettre à jour à chaque changement de fetchedAppointments

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleDelete = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer:\r ${selectedRows.map(r => r.specialite)}?`)) {
            setToggleDelet(!toggleDelet);
            setAppointments(appointments.filter((item) => selectedRows.filter((elem) => elem.id === item.id).length > 0 ? false : true));
            setSelectedRows([]);
        }
    };

    // Affichage du chargement ou de l'erreur
    if (loading) {
        return <p>Chargement des rendez-vous...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Fragment>
            {(selectedRows.length !== 0) &&
                <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Supprimer les rendez-vous sélectionnés..!</H4>
                    <Btn attrBtn={{ color: 'danger', onClick: () => handleDelete() }}>Supprimer</Btn>
                </div>
            }

            <h2 style={{ textAlign: 'left', marginTop: '20px', paddingLeft: '10px' }}>Mes Rendez-vous</h2>

            <div className="table-responsive">
                <DataTable
                    data={appointments}  // Utiliser les rendez-vous récupérés via le hook
                    columns={tableColumns}
                    striped={true}
                    pagination
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleDelet}
                />
            </div>
        </Fragment>
    );
};

export default TableRV;
