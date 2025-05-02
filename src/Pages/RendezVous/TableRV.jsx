import React, { useEffect, useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { FaRegFrown } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { getAppointments } from '../../api/ApiRendezVous';
import { Badge } from 'reactstrap';

const TableRV = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [patientId, setPatientId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/users/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log('Données utilisateur reçues:', response.data);
                setPatientId(response.data._id);
            } catch (err) {
                console.error("Erreur lors de la récupération des informations utilisateur:", err);
                setError("Erreur lors de la récupération des informations utilisateur.");
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!patientId) {
                console.log('PatientId non disponible');
                return;
            }

            console.log('Récupération des rendez-vous pour le patient:', patientId);
            try {
                const appointments = await getAppointments();
                console.log('Rendez-vous reçus:', appointments);
                
                const filteredAppointments = appointments
                    .filter(appointment => 
                        (appointment.demandeParticipe === true) || 
                        (appointment.statutDemande === 'refusé' && appointment.patientId === patientId)
                    )
                    .map(appointment => ({
                        ...appointment,
                        statutLabel: getStatutLabel(appointment.statutDemande)
                    }));
                console.log('Rendez-vous filtrés:', filteredAppointments);
                
                setData(filteredAppointments);
            } catch (err) {
                console.error("Erreur détaillée lors de la récupération des rendez-vous :", err);
                setError("Impossible de récupérer les rendez-vous.");
            } finally {
                setLoading(false);
            }
        };

        if (patientId) {
            fetchAppointments();
            const interval = setInterval(fetchAppointments, 30000);
            return () => clearInterval(interval);
        }
    }, [patientId]);

    const getStatutLabel = (statut) => {
        switch (statut) {
            case 'accepté':
                return { text: 'Accepté', color: 'success' };
            case 'refusé':
                return { text: 'Refusé', color: 'danger' };
            case 'en attente':
                return { text: 'En attente', color: 'warning' };
            default:
                return { text: statut, color: 'secondary' };
        }
    };

    const tableColumns = [
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            sortable: true,
        },
        {
            name: 'Heure',
            selector: row => `${row.heure_debut} - ${row.heure_fin}`,
            sortable: true,
        },
        {
            name: 'Spécialiste',
            selector: row => row.specialiste || 'Non spécifié',
            sortable: true,
        },
        {
            name: 'Médecin',
            selector: row => row.doctorId ? `Dr. ${row.doctorId.nom} ${row.doctorId.prenom}` : 'Non assigné',
            sortable: true,
        },
        {
            name: 'Statut',
            cell: row => (
                <Badge color={row.statutLabel.color} className="px-3 py-2">
                    {row.statutLabel.text}
                </Badge>
            ),
            sortable: true,
            selector: row => row.statutDemande,
        }
    ];

    if (loading) return (
        <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger" role="alert">
            {error}
        </div>
    );

    if (!patientId) return (
        <div className="alert alert-warning" role="alert">
            Veuillez vous connecter pour voir vos rendez-vous.
        </div>
    );

    return (
        <Fragment>
            <h2 className="mb-4">Mes Rendez-vous</h2>
            <div className="table-responsive">
                {data.length === 0 ? (
                    <div className="text-center py-5">
                        <FaRegFrown size={50} className="text-muted mb-3" />
                        <p className="text-muted">Aucun rendez-vous trouvé.</p>
                    </div>
                ) : (
                    <DataTable
                        columns={tableColumns}
                        data={data}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15]}
                        striped
                        highlightOnHover
                        responsive
                    />
                )}
            </div>
        </Fragment>
    );
};

export default TableRV;
