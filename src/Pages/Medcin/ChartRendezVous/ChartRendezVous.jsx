import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import { getAppointmentsStatsByMonthForMedecin } from '../../../api/ApiRendezVous/index'; // Assure-toi que le chemin est correct
import { getMedicalRecordsStatsByMonthForMedecin } from '../../../api/medical/index'; // Assure-toi que le chemin est correct

const ChartRendezVous = () => {
  // États pour les données et les erreurs
  const [appointmentsStats, setAppointmentsStats] = useState([]);
  const [medicalRecordsStats, setMedicalRecordsStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les statistiques des rendez-vous et des dossiers médicaux
    const fetchData = async () => {
      try {
        const appointmentsResponse = await getAppointmentsStatsByMonthForMedecin();
        const medicalRecordsResponse = await getMedicalRecordsStatsByMonthForMedecin();
        
        setAppointmentsStats(appointmentsResponse.stats); // Assurez-vous que 'stats' est la clé contenant les données
        setMedicalRecordsStats(medicalRecordsResponse.stats);
      } catch (error) {
        setError('Erreur lors de la récupération des statistiques.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // L'effet ne se déclenche qu'une fois lors du montage du composant

  // Si les données sont en cours de chargement, afficher un message de chargement
  if (loading) {
    return <div>Chargement des données...</div>;
  }

  // Si une erreur survient, afficher un message d'erreur
  if (error) {
    return <div>{error}</div>;
  }

  // Transformer les données pour le graphique
  const appointmentsData = appointmentsStats.map((stat) => stat.count);
  const medicalRecordsData = medicalRecordsStats.map((stat) => stat.count);
  
  // Options du graphique
  const options = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#28C76F', '#FF9800', '#E91E63', '#1E90FF'],
    dataLabels: {
      enabled: false // Désactive les étiquettes de données
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: '',
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // prend un tableau qui sera répété sur les colonnes
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: 'Months'
      }
    },
    yaxis: {
      title: {
        text: 'Values'
      },
      min: 0,
      max: 60 // Ajustez selon les nouvelles valeurs
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };

  // Séries de données pour le graphique
  const series = [
    {
      name: 'Rendez-vous',
      data: appointmentsData
    },
    {
      name: 'Dossiers Médicaux',
      data: medicalRecordsData
    }
  ];

  return (
    <Col md='6' className='p-0'>
      <Card>
        <CardHeader className='mb-2'>
          <h4>Graphique des Rendez-vous et Dossiers Médicaux</h4>
        </CardHeader>
        <CardBody className='p-0'>
          <div className='current-sale-container order-container'>
            <ReactApexChart
              className='overview-wrapper'
              type='line'
              height={350}
              options={options}
              series={series}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ChartRendezVous;
