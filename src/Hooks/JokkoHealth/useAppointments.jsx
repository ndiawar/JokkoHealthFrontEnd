import { useState, useEffect } from 'react';
import { fetchAppointments } from '../../api/RendezVous/index';

// Hook personnalisé pour récupérer les rendez-vous
const useAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const data = await fetchAppointments(); // Appel à l'API
                setAppointments(data);  // Mettre à jour l'état avec les rendez-vous récupérés
            } catch (error) {
                setError('Erreur lors de la récupération des rendez-vous');  // Gestion des erreurs
                console.error(error);
            } finally {
                setLoading(false);  // Changer l'état de chargement à false une fois que la requête est terminée
            }
        };

        getAppointments();  // Lancer l'appel API au montage du composant
    }, []);  // Tableau vide pour n'exécuter cet effet qu'une seule fois

    return { appointments, loading, error };  // Retourner l'état des rendez-vous, du chargement et des erreurs
};

export default useAppointments;
