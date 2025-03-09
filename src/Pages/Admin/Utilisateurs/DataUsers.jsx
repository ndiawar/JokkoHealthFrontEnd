import React, { Fragment, useCallback, useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import { Input } from 'reactstrap';
import { FaTrash, FaUserSlash, FaUser, FaEdit } from 'react-icons/fa';
import { getAllUsers, deleteUser, blockUser, unblockUser, updateUser } from '../../../api/Crud-Admin/index';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Importer react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importer le CSS
import './DataUsers.css';

// Composant Modal pour la modification des utilisateurs
const UserModal = ({ isOpen, toggle, user, onSave }) => {
    const [localUser, setLocalUser] = useState(user);

    useEffect(() => {
        setLocalUser(user);
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(localUser);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modification des informations</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            value={localUser?.nom || ''}
                            onChange={(e) => setLocalUser({ ...localUser, nom: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="prenom" className="form-label">Prénom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="prenom"
                            value={localUser?.prenom || ''}
                            onChange={(e) => setLocalUser({ ...localUser, prenom: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={localUser?.email || ''}
                            onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telephone" className="form-label">Téléphone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telephone"
                            value={localUser?.telephone || ''}
                            onChange={(e) => setLocalUser({ ...localUser, telephone: e.target.value })}
                        />
                    </div>
                    <ModalFooter>
                        <Button className="btn-cancel" onClick={toggle}>Annuler</Button>
                        <Button className="btn-update" type="submit">Mettre à jour</Button>
                    </ModalFooter>
                </form>
            </ModalBody>
        </Modal>
    );
};

// Composant principal DataUsers
const DataUsers = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [debouncedFilterText, setDebouncedFilterText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Délai pour la recherche
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilterText(filterText);
        }, 300); // Délai de 300ms

        return () => {
            clearTimeout(handler);
        };
    }, [filterText]);

    // Chargement des utilisateurs
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

    // Gestion de la sélection des lignes
    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    // Suppression d'un seul utilisateur
    const handleDeleteSingle = async (row) => {
        if (!row._id) {
            console.error("L'ID de l'utilisateur est undefined !");
            return;
        }

        confirmAlert({
            title: 'Confirmation',
            message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        try {
                            await deleteUser(row._id);
                            setData(data.filter(item => item._id !== row._id));
                            confirmAlert({
                                title: 'Succès',
                                message: 'L\'utilisateur a été supprimé.',
                                buttons: [{ label: 'OK' }]
                            });
                        } catch (error) {
                            console.error("Erreur lors de la suppression :", error);
                            confirmAlert({
                                title: 'Erreur',
                                message: 'Un problème est survenu lors de la suppression.',
                                buttons: [{ label: 'OK' }]
                            });
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick: () => {}
                }
            ]
        });
    };

    // Suppression de plusieurs utilisateurs
    const handleDeleteMultiple = async () => {
        confirmAlert({
            title: 'Confirmation',
            message: `Êtes-vous sûr de vouloir supprimer les utilisateurs suivants : ${selectedRows.map(r => r.nom).join(', ')} ?`,
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        const results = await Promise.all(selectedRows.map(async (row) => {
                            try {
                                await deleteUser(row._id);
                                return { success: true, id: row._id };
                            } catch (error) {
                                console.error("Erreur lors de la suppression :", error);
                                return { success: false, id: row._id, error };
                            }
                        }));

                        const failedDeletions = results.filter(result => !result.success);
                        if (failedDeletions.length > 0) {
                            confirmAlert({
                                title: 'Erreur',
                                message: `Échec de la suppression de ${failedDeletions.length} utilisateur(s).`,
                                buttons: [{ label: 'OK' }]
                            });
                        } else {
                            confirmAlert({
                                title: 'Succès',
                                message: 'Tous les utilisateurs ont été supprimés.',
                                buttons: [{ label: 'OK' }]
                            });
                        }

                        setData(data.filter(item => !selectedRows.some(elem => elem._id === item._id)));
                        setSelectedRows([]);
                    }
                },
                {
                    label: 'Non',
                    onClick: () => {}
                }
            ]
        });
    };

    // Blocage d'un utilisateur
    const handleBlockUser = async (row) => {
        const userId = row._id;
        if (!userId) {
            console.error("L'ID de l'utilisateur est manquant !");
            return;
        }

        confirmAlert({
            title: 'Confirmation',
            message: 'Voulez-vous vraiment bloquer cet utilisateur ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        await blockUser(userId);
                        setData(prevData =>
                            prevData.map(user =>
                                user._id === userId ? { ...user, isBlocked: true } : user
                            )
                        );
                        confirmAlert({
                            title: 'Succès',
                            message: 'L\'utilisateur a été bloqué.',
                            buttons: [{ label: 'OK' }]
                        });
                    }
                },
                {
                    label: 'Non',
                    onClick: () => {}
                }
            ]
        });
    };

    // Déblocage d'un utilisateur
    const handleUnblockUser = async (row) => {
        const userId = row._id;
        if (!userId) {
            console.error("L'ID de l'utilisateur est manquant !");
            return;
        }

        confirmAlert({
            title: 'Confirmation',
            message: 'Voulez-vous vraiment débloquer cet utilisateur ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        await unblockUser(userId);
                        setData(prevData =>
                            prevData.map(user =>
                                user._id === userId ? { ...user, isBlocked: false } : user
                            )
                        );
                        confirmAlert({
                            title: 'Succès',
                            message: 'L\'utilisateur a été débloqué.',
                            buttons: [{ label: 'OK' }]
                        });
                    }
                },
                {
                    label: 'Non',
                    onClick: () => {}
                }
            ]
        });
    };

    // Ouverture de la modale pour l'édition
    const handleEdit = (row) => {
        setSelectedUser(row);
        setModalOpen(true);
    };

    // Mise à jour d'un utilisateur
    const handleUpdateUser = async (updatedUser) => {
        try {
            if (!updatedUser || !updatedUser._id) {
                console.error("L'ID de l'utilisateur est manquant ou invalide !");
                return;
            }

            await updateUser(updatedUser._id, updatedUser);

            // Recharger les données après la mise à jour
            const users = await getAllUsers();
            if (users?.elements && Array.isArray(users.elements)) {
                setData(users.elements);
            }

            setModalOpen(false);
            confirmAlert({
                title: 'Succès',
                message: 'L\'utilisateur a été mis à jour.',
                buttons: [{ label: 'OK' }]
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            confirmAlert({
                title: 'Erreur',
                message: 'Un problème est survenu lors de la mise à jour.',
                buttons: [{ label: 'OK' }]
            });
        }
    };

    // Boutons d'action pour chaque ligne
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

    // Colonnes du tableau
    const customColumns = [
        { name: 'Nom', selector: row => row.nom, sortable: true },
        { name: 'Prénom', selector: row => row.prenom, sortable: true },
        { name: 'Adresse', selector: row => row.adresse, sortable: true },
        { name: 'Téléphone', selector: row => row.telephone, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true },
        { name: 'Actions', cell: row => actionButtons(row), ignoreRowClick: true, allowOverflow: true, button: true },
    ];

    // Filtrage des données
    const filteredData = useMemo(() => {
        return data.filter(row =>
            [row.nom, row.prenom, row.adresse, row.telephone, row.email]
                .some(field => field.toLowerCase().includes(debouncedFilterText.toLowerCase()))
        );
    }, [data, debouncedFilterText]);

    return (
        <Fragment>
            <div className="d-flex align-items-center justify-content-between m-3 p-3 bg-light">
                <H4 attrH4={{ className: 'm-0 text-dark' }}>Total Utilisateurs ({data.length})</H4>
                <div className="d-flex gap-2 mt-4">
                    <Input
                        type="text"
                        placeholder="Rechercher..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="search-input w-100"
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
            />

            <UserModal
                isOpen={modalOpen}
                toggle={() => setModalOpen(!modalOpen)}
                user={selectedUser}
                onSave={handleUpdateUser}
            />
        </Fragment>
    );
};

export default DataUsers;