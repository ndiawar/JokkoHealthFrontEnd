import React, { useEffect, useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie'; // Import de js-cookie
import { jwtDecode } from 'jwt-decode'; // Import de jwt-decode
import { FaRegFrown } from 'react-icons/fa'; // Icône pour le tableau vide
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Colonnes pour le tableau
const tableColumns = [
    {
        name: 'Spécialité',
        selector: row => row.specialite,
        sortable: true,
    },
    {
        name: 'Téléphone',
        selector: row => row.telephone,
        sortable: true,
    },
    {
        name: 'Date de disponibilité',
        selector: row => row.date,
        sortable: true,
    },
    {
        name: 'Heure',
        selector: row => row.heure,
        sortable: true,
    },
    {
        name: 'Demande',
        cell: row => (
            <span className={`badge ${row.demande === 'Acceptée' ? 'bg-success' : 'bg-warning'}`}>
                {row.demande}
            </span>
        ),
        sortable: true,
    },
];

const TableRV = () => {
    const [data, setData] = useState([]); // Les données des rendez-vous
    const [loading, setLoading] = useState(true); // État de chargement
    const [error, setError] = useState(null); // État d'erreur
    const [patientId, setPatientId] = useState(null); // ID du patient

    // Récupérer l'ID de l'utilisateur connecté à partir des cookies
    useEffect(() => {
        const fetchUserDataFromCookie = () => {
            const token = Cookies.get('jwt'); // Récupérer le token JWT des cookies

            if (token) {
                try {
                    const decodedToken = jwtDecode(token); // Décoder le token pour récupérer l'ID
                    setPatientId(decodedToken.id); // Assurez-vous que l'ID se trouve dans la charge utile du token
                } catch (error) {
                    console.error('Erreur lors du décodage du token:', error);
                    setError('Erreur lors de la récupération des informations utilisateur.');
                }
            } else {
                setError('Token non trouvé dans les cookies.');
            }
        };

        fetchUserDataFromCookie(); // Appeler la fonction pour récupérer les données
    }, []);

    // Récupérer les rendez-vous acceptés du patient
    useEffect(() => {
        const fetchAppointments = async () => {
            if (!patientId) return; // Ne pas faire la requête si l'ID du patient n'est pas encore récupéré
        
            try {
                console.log("Envoi de la requête avec le token dans le cookie");
        
                const response = await axios.get('/rendezvous/accepted-for-patient', {
                    withCredentials: true,  // Permet d'envoyer les cookies avec la requête
                });
        
                console.log('Réponse API:', response.data);
        
                if (response.status === 200) {
                    const appointments = response.data;
                    const formattedData = appointments.map(appointment => ({
                        id: appointment._id,
                        specialite: appointment.specialiste,
                        telephone: appointment.doctorId ? appointment.doctorId.telephone : 'Non disponible',
                        date: new Date(appointment.date).toLocaleDateString(),
                        heure: `${appointment.heure_debut} - ${appointment.heure_fin}`,
                        demande: appointment.statutDemande === 'accepté' && appointment.demandeParticipe ? 'Acceptée' : 'Non acceptée',
                    }));
                    setData(formattedData);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des rendez-vous :", err);
                setError("Impossible de récupérer les rendez-vous acceptés.");
            } finally {
                setLoading(false);
            }
        };
        
    
        fetchAppointments();
    }, [patientId]); // Appel lorsque l'ID du patient est disponible
    
    // Affichage du chargement, de l'erreur ou de l'absence de patientId
    if (loading) return <p>Chargement des rendez-vous...</p>;
    if (error) return <p>{error}</p>;
    if (!patientId) return <p>Veuillez vous connecter pour voir vos rendez-vous.</p>;

    return (
        <Fragment>
            <h2 style={{ textAlign: 'left', marginTop: '20px', paddingLeft: '10px' }}>Mes Rendez-vous</h2>
            <div className="table-responsive">
                {data.length === 0 ? (
                    <div className="text-center">
                        <FaRegFrown size={50} color="#f8d7da" />
                        <p style={{ color: '#f8d7da' }}>Aucun rendez-vous accepté trouvé pour ce patient.</p>
                    </div>
                ) : (
                    <DataTable
                        data={data}
                        columns={tableColumns}
                        striped={true}
                        pagination
                    />
                )}
            </div>
        </Fragment>
    );
};

export default TableRV;
