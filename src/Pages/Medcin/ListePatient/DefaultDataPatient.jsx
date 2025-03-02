import React from 'react';
import { Media } from 'reactstrap';
import { Image } from '../../../AbstractElements';
import { useFetchMedicalRecords } from '../../../Hooks/JokkoHealth/useMedical';
import userPlaceholder from '../../../assets/images/user/user.png'; // Placeholder image

// Hook pour transformer les données en format attendu
export const usePatientData = () => {
  const { data: medicalRecords, error, isLoading, isError } = useFetchMedicalRecords();

  // Vérifie si les données sont en cours de chargement ou s'il y a une erreur
  if (isLoading) return { patientData: [], isLoading };
  if (isError) return { patientData: [], error };

  // Transformation des données pour correspondre à la structure attendue
  const patientData = medicalRecords
    ? medicalRecords.map((record) => ({
        id: record._id,
        name: (
          <Media className='d-flex'>
            <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: userPlaceholder, alt: 'Generic placeholder image' }} />
            <Media body className='align-self-center'>
              <div>{record.patientId ? `${record.patientId.nom} ${record.patientId.prenom}` : 'Unknown'}</div>
            </Media>
          </Media>
        ),
        email: record.patientId ? record.patientId.email : 'Unknown',
        status: <span className={`badge badge-dark-${getStatusBadge(record.status)}`}>{record.status}</span>,
        // Utiliser 'hospitalisation' pour le diagnostic
        diagnostic: record.hospitalisation || 'N/A',
      }))
    : [];

  return { patientData, error, isLoading };
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'urgent':
      return 'urgent'; // Correspond à .badge-dark-urgent
    case 'en traitement':
      return 'en-traitement'; // Correspond à .badge-dark-en-traitement
    case 'hospitalisé':
      return 'hospitalise'; // Correspond à .badge-dark-hospitalise
    case 'sortie':
      return 'sortie'; // Correspond à .badge-dark-sortie
    case 'stable':
      return 'stable'; // Correspond à .badge-dark-stable
    default:
      return 'secondary'; // Valeur par défaut
  }
};



export const tableColumns = [
  {
    name: 'Name',
    selector: row => row['name'],
    sortable: true,
    center: false,
  },
  {
    name: 'Email',
    selector: row => row['email'],
    sortable: true,
    center: true,
  },
  {
    name: 'Status',
    selector: row => row['status'],
    sortable: true,
    center: true,
  },
  {
    name: 'Diagnostic',
    selector: row => row['diagnostic'],
    sortable: true,
    center: true,
  },
];