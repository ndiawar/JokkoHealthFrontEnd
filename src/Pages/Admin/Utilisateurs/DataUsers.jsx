import React, { Fragment, useCallback, useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import { Input } from 'reactstrap';
import { FaTrash, FaUserSlash, FaUser, FaEdit, FaPlus } from 'react-icons/fa';
import { getAllUsers, deleteUser, blockUser, unblockUser, updateUser } from '../../../api/Crud-Admin/index';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Swal from 'sweetalert2';

import './DataUsers.css';

const DataUsers = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                if (users?.elements && Array.isArray(users.elements)) {
                    setData(users.elements);
                } else {
                    console.error('Format inattendu des données utilisateurs:', users);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleDeleteSingle = async (row) => {
        if (!row._id) {
            console.error("L'ID de l'utilisateur est undefined !");
            return;
        }

        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action est irréversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            try {
                await deleteUser(row._id);
                setData(data.filter(item => item._id !== row._id));
                Swal.fire('Supprimé !', 'L\'utilisateur a été supprimé.', 'success');
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
                Swal.fire('Erreur !', 'Un problème est survenu lors de la suppression.', 'error');
            }
        }
    };

    const handleDeleteMultiple = async () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer :\r ${selectedRows.map(r => r.nom)}?`)) {
            await Promise.all(selectedRows.map(async (row) => {
                try {
                    await deleteUser(row.id);
                } catch (error) {
                    console.error("Erreur lors de la suppression :", error);
                }
            }));
            setData(data.filter(item => !selectedRows.some(elem => elem.id === item.id)));
            setSelectedRows([]);
        }
    };

    const handleBlockUser = async (row) => {
        const userId = row.id || row._id;
        if (!userId) {
            console.error("L'ID de l'utilisateur est manquant !");
            return;
        }

        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: `Voulez-vous vraiment bloquer cet utilisateur ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            await blockUser(userId);
            setData(prevData =>
                prevData.map(user =>
                    user.id === userId ? { ...user, isBlocked: true } : user
                )
            );
            Swal.fire('Succès!', 'L\'utilisateur a été bloqué.', 'success');
        }
    };

    const handleUnblockUser = async (row) => {
        const userId = row.id || row._id;
        if (!userId) {
            console.error("L'ID de l'utilisateur est manquant !");
            return;
        }

        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: `Voulez-vous vraiment débloquer cet utilisateur ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            await unblockUser(userId);
            setData(prevData =>
                prevData.map(user =>
                    user.id === userId ? { ...user, isBlocked: false } : user
                )
            );
            Swal.fire('Succès!', 'L\'utilisateur a été débloqué.', 'success');
        }
    };

    const handleEdit = (row) => {
        setSelectedUser(row);
        setModalOpen(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            console.log("Données de l'utilisateur à mettre à jour :", selectedUser);
    
            if (!selectedUser || !selectedUser._id) {
                console.error("L'ID de l'utilisateur est manquant ou invalide !");
                return;
            }
    
            await updateUser(selectedUser._id, selectedUser);
    
            setData(prevData =>
                prevData.map(user =>
                    user._id === selectedUser._id ? selectedUser : user
                )
            );
            setModalOpen(false);
            Swal.fire('Succès!', 'L\'utilisateur a été mis à jour.', 'success');
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            Swal.fire('Erreur!', 'Un problème est survenu lors de la mise à jour.', 'error');
        }
    };
    
    const handleAddUser = () => {
        console.log("Ajouter un utilisateur");
        // Ajoutez ici la logique pour ouvrir un formulaire ou une modal pour ajouter un nouvel utilisateur
    };

    const actionButtons = (row) => {
        return (
            <div className="action-buttons">
                <Btn attrBtn={{ color: 'transparent', style: { background: 'none', border: 'none' }, onClick: () => handleDeleteSingle(row) }}>
                    <FaTrash style={{ color: 'red' }} />
                </Btn>
                <Btn attrBtn={{ color: 'transparent', style: { background: 'none', border: 'none' }, onClick: () => row.isBlocked ? handleUnblockUser(row) : handleBlockUser(row) }}>
                    {row.isBlocked ? <FaUser style={{ color: 'green' }} /> : <FaUserSlash style={{ color: 'red' }} />}
                </Btn>
                <Btn attrBtn={{ color: 'transparent', style: { background: 'none', border: 'none' }, onClick: () => handleEdit(row) }}>
                    <FaEdit style={{ color: 'blue' }} />
                </Btn>
            </div>
        );
    };

    const customColumns = [
        { name: 'Nom', selector: row => row.nom, sortable: true },
        { name: 'Prénom', selector: row => row.prenom, sortable: true },
        { name: 'Adresse', selector: row => row.adresse, sortable: true },
        { name: 'Téléphone', selector: row => row.telephone, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true },
        { name: 'Actions', cell: row => actionButtons(row), ignoreRowClick: true, allowOverflow: true, button: true },
    ];

    const filteredData = useMemo(() => {
        return data.filter(row =>
            [row.nom, row.prenom, row.adresse, row.telephone, row.email]
                .some(field => field.toLowerCase().includes(filterText.toLowerCase()))
        );
    }, [data, filterText]);

    return (
        <Fragment>
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

            {selectedRows.length !== 0 && (
                <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Supprimer les éléments sélectionnés</H4>
                    <Btn attrBtn={{ color: 'danger', onClick: handleDeleteMultiple }}>Supprimer</Btn>
                </div>
            )}

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

            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Modification des informations</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleUpdateUser}>
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                value={selectedUser?.nom || ''}
                                onChange={(e) => setSelectedUser({...selectedUser, nom: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prenom" className="form-label">Prénom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="prenom"
                                value={selectedUser?.prenom || ''}
                                onChange={(e) => setSelectedUser({...selectedUser, prenom: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={selectedUser?.email || ''}
                                onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telephone" className="form-label">Téléphone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="telephone"
                                value={selectedUser?.telephone || ''}
                                onChange={(e) => setSelectedUser({...selectedUser, telephone: e.target.value})}
                            />
                        </div>
                        <ModalFooter>
                        <Button className="btn-cancel" onClick={() => setModalOpen(false)}>Annuler</Button>
                        <Button className="btn-update" type="submit">Mettre à jour</Button>
                        </ModalFooter>



                    </form>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default DataUsers;
