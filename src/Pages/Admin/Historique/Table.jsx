import React, { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { H4 } from '../../../AbstractElements';
import 'bootstrap/dist/css/bootstrap.min.css';

const tableColumns = [
    { name: 'Utilisateur', selector: row => row.utilisateur, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Action', cell: row => (<span>{`${row.utilisateur} ${getActionMessage(row.action)}`}</span>), sortable: false },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Heure', selector: row => row.heure, sortable: true },
];

// Fonction pour convertir l'action en un message clair
const getActionMessage = (action) => {
    // Action basée sur l'endpoint et la méthode HTTP
    if (action.includes('GET /api/users/me')) {
        return "a consulté son profil";
    }
    if (action.includes('GET /api/medical')) {
        return "a consulté les dossiers médicaux";
    }
    if (action.includes('PUT /api/medical')) {
        return "a mis à jour un dossier médical";
    }
    if (action.includes('DELETE /api/medical')) {
        return "a supprimé un dossier médical";
    }
    if (action.includes('POST /api/users')) {
        return "a ajouté un utilisateur";
    }
    // Message par défaut si l'action n'est pas identifiée
    return `a effectué une action inconnue (${action})`;
};

const Table = () => {
    const [data, setData] = useState([]); // Mettre à jour avec les logs
    const [filteredData, setFilteredData] = useState([]);
    const [rowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState(''); // Champ de recherche

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('logs');
                const result = await response.json();
                if (result.logs) {
                    const formattedLogs = result.logs.map(log => ({
                        id: log._id,
                        utilisateur: `${log.userId.prenom} ${log.userId.nom}`,  // Nom complet
                        email: log.userId.email,              // Email de l'utilisateur
                        action: log.action,                   // Action complète (GET, POST, etc.)
                        date: new Date(log.timestamp).toLocaleDateString(),
                        heure: new Date(log.timestamp).toLocaleTimeString(),
                    }));
                    setData(formattedLogs);
                    setFilteredData(formattedLogs);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des logs:', error);
            }
        };

        fetchLogs();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredData(data);
        } else {
            const results = data.filter(item =>
                item.utilisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.date.includes(searchTerm)  // Filtrer également sur la date
            );
            setFilteredData(results);
        }
    }, [searchTerm, data]);

    return (
        <Fragment>
            {/* Champ de recherche */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Rechercher un utilisateur, email, action ou date"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-responsive mt-3">
                {filteredData.length === 0 ? (
                    <div className="text-center mt-3">
                        <H4 attrH4={{ className: 'text-muted' }}>Aucun log trouvé</H4>
                    </div>
                ) : (
                    <DataTable
                        data={filteredData}
                        columns={tableColumns}
                        striped={true}
                        pagination
                        paginationPerPage={rowsPerPage}
                        selectableRows={false}  // Désactiver la sélection des lignes
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Table;
