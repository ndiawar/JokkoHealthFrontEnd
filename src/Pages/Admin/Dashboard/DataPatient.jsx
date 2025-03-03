import React, { Fragment, useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { usePatientData, tableColumns } from '../../Medcin/ListePatient/DefaultDataPatient';
import './Dashboard.css';

const DataPatient = () => {
    const [showAll, setShowAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Nombre d'éléments par page

    const { patientData, error, isLoading } = usePatientData();

    // Quand on change de page
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    // Quand on clique sur "Voir tout", on affiche toutes les données
    const displayedData = useMemo(() => {
        if (showAll) {
            return patientData;
        } else {
            return patientData.slice(0, itemsPerPage * currentPage);
        }
    }, [showAll, patientData, currentPage, itemsPerPage]);

    const totalItems = patientData.length;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Fragment>
            {/* Boutons "Voir tout" et "Voir moins" en haut */}
            <div className="voir-tout-container">
                {!showAll ? (
                    <button 
                        className="voir-tout-btn"
                        onClick={() => setShowAll(true)}
                    >
                        Voir tout
                    </button>
                ) : (
                    <button 
                        className="voir-tout-btn"
                        onClick={() => {
                            setShowAll(false);
                            setCurrentPage(1); // Réinitialiser la page à 1 quand on clique sur "Voir moins"
                        }}
                    >
                        Voir moins
                    </button>
                )}
            </div>

            <DataTable
                data={displayedData}
                columns={tableColumns}
                striped
                highlightOnHover
                customStyles={{
                    headCells: {
                        style: {
                            backgroundColor: '#f8f9fa',
                            fontWeight: '600',
                            fontSize: '15px'
                        },
                    },
                    cells: {
                        style: {
                            fontSize: '14px',
                            padding: '15px'
                        },
                    },
                }}
                // Pagination uniquement quand on est en mode "Voir tout"
                pagination={showAll}
                paginationServer={showAll}
                paginationTotalRows={totalItems}
                paginationPerPage={itemsPerPage}
                onChangePage={handlePageChange}
                // Traduction de la pagination
                paginationText="Affichage de {{from}} à {{to}} sur {{count}}"
                // Traduction pour "Rows per page"
                paginationRowsPerPageText="Lignes par page"
                // Traduction pour les boutons "Suivant" et "Précédent"
                paginationPrevText="Précédent"
                paginationNextText="Suivant"
                // Options de pagination : Lignes par page
                paginationRowsPerPageOptions={[4, 10, 15, 20]}
            />
        </Fragment>
    );
};

export default DataPatient;