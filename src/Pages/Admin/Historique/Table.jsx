import React, { Fragment, useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { H4 } from '../../../AbstractElements';
import 'bootstrap/dist/css/bootstrap.min.css';

const tableColumns = [
    { name: 'Utilisateurs', selector: row => row.utilisateur, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Action', cell: row => (<span>{`${row.utilisateur} s'est connecté`}</span>), sortable: false },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Heure', selector: row => row.heure, sortable: true },
];

const dummytabledata = [
    { id: 1, utilisateur: 'Jean Dupont', email: 'jean.dupont@example.com', date: '18-02-2025', heure: '08h-12h' },
    { id: 2, utilisateur: 'Marie Curie', email: 'marie.curie@example.com', date: '19-02-2025', heure: '10h-15h' },
    { id: 3, utilisateur: 'Albert Einstein', email: 'albert.einstein@example.com', date: '20-02-2025', heure: '09h-13h' },
    { id: 4, utilisateur: 'Isaac Newton', email: 'isaac.newton@example.com', date: '21-02-2025', heure: '11h-14h' },
    { id: 5, utilisateur: 'Galilée', email: 'galilee@example.com', date: '22-02-2025', heure: '12h-16h' },
    { id: 6, utilisateur: 'Stephen Hawking', email: 'hawking@example.com', date: '23-02-2025', heure: '14h-18h' },
    { id: 7, utilisateur: 'Niels Bohr', email: 'bohr@example.com', date: '24-02-2025', heure: '15h-19h' },
    { id: 8, utilisateur: 'Ada Lovelace', email: 'lovelace@example.com', date: '25-02-2025', heure: '16h-20h' },
    { id: 9, utilisateur: 'Carl Sagan', email: 'carl.sagan@example.com', date: '26-02-2025', heure: '09h-12h' },
    { id: 10, utilisateur: 'Richard Feynman', email: 'richard.feynman@example.com', date: '27-02-2025', heure: '10h-15h' },
    { id: 11, utilisateur: 'Rosalind Franklin', email: 'rosalind.franklin@example.com', date: '28-02-2025', heure: '11h-14h' },
    { id: 12, utilisateur: 'Nikola Tesla', email: 'nikola.tesla@example.com', date: '01-03-2025', heure: '12h-16h' },
    { id: 13, utilisateur: 'Charles Darwin', email: 'charles.darwin@example.com', date: '02-03-2025', heure: '14h-18h' },
    { id: 14, utilisateur: 'Jane Goodall', email: 'jane.goodall@example.com', date: '03-03-2025', heure: '15h-19h' },
    { id: 15, utilisateur: 'Stephen Hawking', email: 'stephen.hawking@example.com', date: '04-03-2025', heure: '16h-20h' },
];

const Table = ({ searchTerm }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelet, setToggleDelet] = useState(false);
    const [data, setData] = useState(dummytabledata);
    const [filteredData, setFilteredData] = useState(dummytabledata);
    const [rowsPerPage] = useState(5); // État pour le nombre de lignes par page

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredData(data);
        } else {
            const results = data.filter(item =>
                item.utilisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(results);
        }
    }, [searchTerm, data]);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleDelete = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer:\r ${selectedRows.map(r => r.utilisateur)}?`)) {
            setToggleDelet(!toggleDelet);
            setData(data.filter(item => !selectedRows.some(elem => elem.id === item.id)));
            setSelectedRows([]);
        }
    };

    return (
        <Fragment>
            {selectedRows.length !== 0 && (
                <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Supprimer les utilisateurs sélectionnés..!</H4>
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            )}

            <div className="table-responsive mt-3">
                {filteredData.length === 0 ? (
                    <div className="text-center mt-3">
                        <H4 attrH4={{ className: 'text-muted' }}>Utilisateur non trouvé</H4>
                    </div>
                ) : (
                    <DataTable
                        data={filteredData}
                        columns={tableColumns}
                        striped={true}
                        pagination
                        paginationPerPage={rowsPerPage} // Utilisation de l'état pour le nombre de lignes par page
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleDelet}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Table;