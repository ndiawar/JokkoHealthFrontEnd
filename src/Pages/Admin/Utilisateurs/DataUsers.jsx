import React, { Fragment, useCallback, useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import { Input } from 'reactstrap';
import { FaTrash, FaUserSlash, FaUser, FaEdit } from 'react-icons/fa';
import { getAllUsers, deleteUser, blockUser, unblockUser, updateUser } from '../../../api/Crud-Admin/index';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './DataUsers.css';
import { Breadcrumbs } from '../../../AbstractElements';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Délai pour la recherche
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilterText(filterText);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [filterText]);

    // Récupération de l'utilisateur connecté
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCurrentUserId(response.data._id);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error);
                toast.error('Erreur lors de la récupération de votre profil');
            }
        };
        fetchCurrentUser();
    }, []);

    // Chargement des utilisateurs (exclut l'utilisateur connecté)
    useEffect(() => {
        if (!currentUserId) return;

        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                if (users?.elements && Array.isArray(users.elements)) {
                    const filteredUsers = users.elements.filter(user => user._id !== currentUserId);
                    setData(filteredUsers);
                } else {
                    console.error('Format inattendu des données utilisateurs:', users);
                    toast.error('Format de données inattendu');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
                toast.error('Erreur lors du chargement des utilisateurs');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentUserId]);

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
                            toast.success('L\'utilisateur a été supprimé');
                        } catch (error) {
                            console.error("Erreur lors de la suppression :", error);
                            toast.error('Un problème est survenu lors de la suppression');
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
                            toast.error(`Échec de la suppression de ${failedDeletions.length} utilisateur(s)`);
                        } else {
                            toast.success('Tous les utilisateurs ont été supprimés');
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
                        try {
                            await blockUser(userId);
                            setData(prevData =>
                                prevData.map(user =>
                                    user._id === userId ? { ...user, isBlocked: true } : user
                                )
                            );
                            toast.success('L\'utilisateur a été bloqué');
                        } catch (error) {
                            console.error("Erreur lors du blocage :", error);
                            toast.error('Erreur lors du blocage de l\'utilisateur');
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
                        try {
                            await unblockUser(userId);
                            setData(prevData =>
                                prevData.map(user =>
                                    user._id === userId ? { ...user, isBlocked: false } : user
                                )
                            );
                            toast.success('L\'utilisateur a été débloqué');
                        } catch (error) {
                            console.error("Erreur lors du déblocage :", error);
                            toast.error('Erreur lors du déblocage de l\'utilisateur');
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
                const filteredUsers = users.elements.filter(user => user._id !== currentUserId);
                setData(filteredUsers);
            }

            setModalOpen(false);
            toast.success('L\'utilisateur a été mis à jour');
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            toast.error('Un problème est survenu lors de la mise à jour');
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
        { name: 'Nom', selector: row => row.nom, sortable: true, width: '20%' },
        { name: 'Prénom', selector: row => row.prenom, sortable: true, width: '20%' },
        { name: 'Téléphone', selector: row => row.telephone, sortable: true, width: '20%' },
        { name: 'Email', selector: row => row.email, sortable: true, width: '20%' },
        { name: 'Actions', cell: row => actionButtons(row), ignoreRowClick: true, allowOverflow: true, button: true, width: '20%' },
    ];

    // Filtrage des données
    const filteredData = useMemo(() => {
        return data.filter(row =>
            [row.nom, row.prenom, row.telephone, row.email]
                .some(field => field?.toLowerCase().includes(debouncedFilterText.toLowerCase()))
        );
    }, [data, debouncedFilterText]);

    if (loading) {
        return (
            <Fragment>
                <Breadcrumbs mainTitle="Utilisateurs" parent="Administrateur" title="Utilisateurs" />
                <div className="text-center p-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Chargement...</span>
                    </div>
                    <p className="mt-2">Chargement des utilisateurs...</p>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Breadcrumbs mainTitle="Utilisateurs" parent="Administrateur" title="Utilisateurs" />
            <div className="d-flex align-items-center justify-content-between bg-light">
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

            <div style={{ width: '100%', overflowX: 'hidden' }}>
                <DataTable
                    data={filteredData}
                    columns={customColumns}
                    striped={true}
                    center={true}
                    pagination
                    paginationPerPage={9}
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                    customStyles={{
                        table: {
                            style: {
                                width: '100%',
                                tableLayout: 'fixed'
                            }
                        },
                        cells: {
                            style: {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                padding: '8px'
                            }
                        },
                        header: {
                            style: {
                                padding: '8px'
                            }
                        }
                    }}
                />
            </div>

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