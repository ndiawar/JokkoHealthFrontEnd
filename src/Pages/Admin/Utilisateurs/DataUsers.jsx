import React, { Fragment, useCallback, useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import { Input } from 'reactstrap';
import { usersData, tableColumns } from './DefaultDataUsers';
import { FaTrash, FaUserSlash, FaEdit, FaPlus } from 'react-icons/fa';
import './DataUsers.css';

const DataUsers = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [data, setData] = useState(usersData);
    const [filterText, setFilterText] = useState('');

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleDelete = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer :\r ${selectedRows.map(r => r.name)}?`)) {
            setToggleDelete(!toggleDelete);
            setData(data.filter(item => !selectedRows.some(elem => elem.id === item.id)));
            setSelectedRows([]);
        }
    };

    const handleEdit = (row) => {
        console.log("Modifier utilisateur :", row);
    };

    const handleBlock = (row) => {
        console.log("Utilisateur bloqué :", row);
    };

    const handleAddUser = () => {
        console.log("Ajouter un nouvel utilisateur");
    };

    const actionButtons = (row) => (
        <div className="action-buttons">
            <Btn attrBtn={{ color: 'transparent', style: { background: 'none', border: 'none' }, onClick: () => handleDelete(row) }}>
                <FaTrash style={{ color: 'red' }} />
            </Btn>
            <Btn attrBtn={{ color: 'transparent', style: { background: 'none', border: 'none' }, onClick: () => handleBlock(row) }}>
                <FaUserSlash style={{ color: 'red' }} />
            </Btn>
            <Btn attrBtn={{ color: 'transparent', style: { background: 'none', border: 'none' }, onClick: () => handleEdit(row) }}>
                <FaEdit style={{ color: 'green' }} />
            </Btn>
        </div>
    );

    const customColumns = [
        ...tableColumns,
        {
            name: 'Actions',
            cell: row => actionButtons(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const extractText = (element) => {
        if (typeof element === 'string') {
            return element;
        } else if (element.props && element.props.children) {
            return extractText(element.props.children);
        } else if (Array.isArray(element)) {
            return element.map(extractText).join(' ');
        }
        return '';
    };

    const filteredData = useMemo(() => {
        return data.filter(
            row =>
                extractText(row.name).toLowerCase().includes(filterText.toLowerCase()) ||
                row.email.toLowerCase().includes(filterText.toLowerCase()) ||
                row.diagnostic.toLowerCase().includes(filterText.toLowerCase())
        );
    }, [data, filterText]);

    return (
        <Fragment>
            {/* Barre du haut avec total utilisateurs et bouton d'ajout */}
            <div className="d-flex align-items-center justify-content-between m-3 p-3 bg-light">
                <H4 attrH4={{ className: 'm-0 text-dark' }}>Total Utilisateurs ({data.length})</H4>
                <div className="d-flex gap-2 mt-4">
                    <Btn attrBtn={{ color: 'primary', onClick: handleAddUser }}>
                        <FaPlus />
                    </Btn>
                    <Input
                        type="text"
                        placeholder="Rechercher..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="search-input"
                    />
                    
                </div>
            </div>

            {/* Barre d'alerte pour suppression */}
            {selectedRows.length !== 0 && (
                <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Supprimer les éléments sélectionnés</H4>
                    <Btn attrBtn={{ color: 'danger', onClick: handleDelete }}>Supprimer</Btn>
                </div>
            )}

            {/* Tableau des utilisateurs */}
            <DataTable
                data={filteredData}
                columns={customColumns}
                striped={true}
                center={true}
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleDelete}
            />
        </Fragment>
    );
};

export default DataUsers;
