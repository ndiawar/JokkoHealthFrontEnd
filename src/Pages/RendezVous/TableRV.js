import React, { Fragment, useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../AbstractElements';
import 'bootstrap/dist/css/bootstrap.min.css';

// Définition des colonnes avec des styles pour l'alignement équitable
const tableColumns = [
    {
        name: 'Spécialité',
        selector: row => row.specialite,
        sortable: true,
        style: { flex: 1, padding: '0 10px' }, // Utilisation de Flexbox pour une largeur équitable
    },
    {
        name: 'Téléphone',
        selector: row => row.telephone,
        sortable: true,
        style: { flex: 1, padding: '0 10px' }, // Utilisation de Flexbox pour une largeur équitable
    },
    {
        name: 'Date de disponibilité',
        selector: row => row.date,
        sortable: true,
        style: { flex: 1, padding: '0 10px' }, // Utilisation de Flexbox pour une largeur équitable
    },
    {
        name: 'Heure',
        selector: row => row.heure,
        sortable: true,
        style: { flex: 1, padding: '0 10px' }, // Utilisation de Flexbox pour une largeur équitable
    },
    {
        name: 'Demande',
        cell: row => (
            <span className={`badge ${row.demande === 'Accepté' ? 'bg-success' : 'bg-warning'}`}>
                {row.demande}
            </span>
        ),
        sortable: true,
        style: { flex: 1, padding: '0 10px' }, // Utilisation de Flexbox pour une largeur équitable
    },
];

const dummytabledata = [
    { id: 1, specialite: 'Cardiologue', telephone: '77 123 45 67', date: '18-02-2025', heure: '08h-12h', demande: 'Accepté' },
    { id: 2, specialite: 'Dentiste', telephone: '76 234 56 78', date: '19-02-2025', heure: '10h-15h', demande: 'En attente' },
    { id: 3, specialite: 'Pédiatre', telephone: '70 345 67 89', date: '20-02-2025', heure: '09h-13h', demande: 'Accepté' },
    { id: 4, specialite: 'Dermatologue', telephone: '33 456 78 90', date: '21-02-2025', heure: '11h-14h', demande: 'En attente' },
];

const TableRV = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelet, setToggleDelet] = useState(false);
    const [data, setData] = useState(dummytabledata);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleDelete = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer:\r ${selectedRows.map(r => r.specialite)}?`)) {
            setToggleDelet(!toggleDelet);
            setData(data.filter((item) => selectedRows.filter((elem) => elem.id === item.id).length > 0 ? false : true));
            setSelectedRows([]);
        }
    };

    return (
        <Fragment>
            {(selectedRows.length !== 0) &&
                <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Supprimer les rendez-vous sélectionnés..!</H4>
                    <Btn attrBtn={{ color: 'danger', onClick: () => handleDelete() }}>Supprimer</Btn>
                </div>
            }

            {/* Titre aligné à gauche */}
            <h2 style={{ textAlign: 'left', marginTop: '20px', paddingLeft: '10px' }}>Mes Rendez-vous</h2>

            {/* Table responsive */}
            <div className="table-responsive">
                <DataTable
                    data={data}
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
