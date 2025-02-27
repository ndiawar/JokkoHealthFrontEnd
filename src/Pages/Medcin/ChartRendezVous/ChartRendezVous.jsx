import React from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';

const ChartRendezVous = () => {
  // Données des séries pour le graphique avec des variations
  const series = [
    {
      name: 'Consultation',
      data: [45, 50, 40, 55, 35, 40, 50, 45, 55, 40, 50, 48]
    },
    {
      name: 'Rendez-vous',
      data: [30, 35, 40, 30, 40, 35, 45, 30, 35, 40, 30, 33]
    },
    {
      name: 'Urgence',
      data: [25, 30, 35, 20, 40, 25, 30, 35, 20, 25, 30, 27]
    },
    {
      name: 'Guérisons',
      data: [15, 20, 25, 10, 30, 15, 20, 25, 10, 15, 20, 18]
    }
  ];

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

  return (
    <Col md='6' className='p-0'>
      <Card>
        <CardHeader>
          <h4>Graphique des Rendez-vous</h4>
        </CardHeader>
        <CardBody className='p-0'>
          <div className='current-sale-container order-container'>
            <ReactApexChart className='overview-wrapper' type='line' height={350} options={options} series={series} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ChartRendezVous;
