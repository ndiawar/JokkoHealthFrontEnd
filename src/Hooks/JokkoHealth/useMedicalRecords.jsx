import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../api/DossierMedical/index';

const useUserProfile = (medicalRecordId) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les informations du dossier médical
    const fetchProfile = async () => {
        try {
            const data = await getUserProfile(medicalRecordId); // Utilisez la fonction de l'API
            setProfile(data);
        } catch (error) {
            setError("Erreur lors de la récupération des informations.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Mettre à jour les informations du dossier médical
    const handleUpdateProfile = async (data) => {
        try {
            const updatedProfile = await updateUserProfile(medicalRecordId, data); // Utilisez la fonction de l'API
            setProfile(updatedProfile); // Mettre à jour l'état avec les nouvelles données
        } catch (error) {
            setError("Erreur lors de la mise à jour des informations.");
            console.error(error);
            throw error;
        }
    };

    // Charger les données au montage du composant
    useEffect(() => {
        fetchProfile();
    }, [medicalRecordId]);

    return { profile, loading, error, handleUpdateProfile };
};

export default useUserProfile;