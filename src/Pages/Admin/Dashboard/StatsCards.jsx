import React, { useEffect, useState } from 'react';
import { BsPerson, BsPeople, BsPersonPlus, BsCalendar3 } from 'react-icons/bs';
import { Spinner } from 'react-bootstrap'; // Importez Spinner
import { fetchTotalUsersByRole } from '../../../api/filteruser'; // Importez la méthode
import { useFetchAppointments } from '../../../Hooks/JokkoHealth/useRendezVous'; // Importez le hook

const StatsCards = () => {
    // États pour stocker les totaux des utilisateurs
    const [totals, setTotals] = useState({
        totalPatients: 0,
        totalMedecins: 0,
        totalSuperAdmins: 0,
    });

    // Utilisation du hook pour récupérer les rendez-vous
    const { data: appointments, isLoading: loadingAppointments } = useFetchAppointments(); // Retirez errorAppointments si inutilisé

    // Charger les données au montage du composant
    useEffect(() => {
        const loadTotals = async () => {
            try {
                const data = await fetchTotalUsersByRole(); // Appel de la méthode
                if (data) {
                    setTotals(data); // Mettre à jour l'état avec les données reçues
                }
            } catch (error) {
                console.error("Erreur lors du chargement des totaux des utilisateurs:", error);
            }
        };

        loadTotals();
    }, []);

    // Afficher un spinner pendant le chargement des données
    if (loadingAppointments) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="row g-3">
                        {/* Carte pour le total des médecins */}
                        <div className="col-12 col-sm-6 col-md-3">
                            <InfoCard
                                title="Total Médecins"
                                value={totals.totalMedecins.toString()} // Afficher le total des médecins
                                icon={<BsPerson style={{ color: '#12687B' }} className="fs-3" />}
                            />
                        </div>

                        {/* Carte pour le total du personnel (SuperAdmins) */}
                        <div className="col-12 col-sm-6 col-md-3">
                            <InfoCard
                                title="Total du personnel"
                                value={totals.totalSuperAdmins.toString()} // Afficher le total du personnel
                                icon={<BsPeople style={{ color: '#12687B' }} className="fs-3" />}
                            />
                        </div>

                        {/* Carte pour le total des patients */}
                        <div className="col-12 col-sm-6 col-md-3">
                            <InfoCard
                                title="Total des patients"
                                value={totals.totalPatients.toString()} // Afficher le total des patients
                                icon={<BsPersonPlus style={{ color: '#12687B' }} className="fs-3" />}
                            />
                        </div>

                        {/* Carte pour les rendez-vous (dynamique) */}
                        <div className="col-12 col-sm-6 col-md-3">
                            <InfoCard
                                title="Rendez-vous"
                                value={appointments?.length.toString() || "0"} // Afficher le total des rendez-vous
                                icon={<BsCalendar3 style={{ color: '#12687B' }} className="fs-3" />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant InfoCard (inchangé)
const InfoCard = ({ title, value, icon }) => (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white border rounded shadow-sm">
        <div>
            <h3 className="fs-6 text-secondary mb-1">{title}</h3>
            <p className="fs-4 fw-semibold text-dark mb-0">{value}</p>
        </div>
        <div className="bg-light rounded p-2">
            {icon}
        </div>
    </div>
);

export default StatsCards;