import React from 'react';
import { Line } from 'react-chartjs-2';

// Couleurs mises à jour
const temperatureColor = '#007BFF'; // Bleu pour la température
const bloodPressureColor = '#DC3545'; // Rouge pour la pression artérielle

// Données de la pression artérielle
const bloodPressureData = {
    labels: ['09:00', '12:00', '15:00', '18:00'],
    datasets: [
        {
            label: 'Pression artérielle',
            data: [98, 100, 95, 102], // Remplacez par vos données réelles
            borderColor: bloodPressureColor, // Couleur rouge
            backgroundColor: 'rgba(220, 53, 69, 0.4)', // Couleur rouge avec transparence
            borderWidth: 2,
        },
    ],
};

// Options pour le graphique de pression artérielle
const bloodPressureOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        display: false,
    },
    scales: {
        y: {
            beginAtZero: false,
            grid: {
                display: true,
                color: '#e0e0e0',
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
};

// Données de température
const temperatureData = {
    labels: ['09:00', '12:00', '15:00', '18:00'],
    datasets: [
        {
            label: 'Température',
            data: [36.5, 37.0, 37.2, 37.5], // Remplacez par vos données réelles
            borderColor: temperatureColor, // Couleur bleue
            backgroundColor: 'rgba(0, 123, 255, 0.4)', // Couleur bleue avec transparence
            borderWidth: 2,
        },
    ],
};

// Options pour le graphique de température
const temperatureOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        display: false,
    },
    scales: {
        y: {
            beginAtZero: false,
            grid: {
                display: true,
                color: '#e0e0e0',
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
};

const ChartDashboard = () => {
    return (
        <div style={{ width: '100%', maxWidth: '900px', margin: 'auto', marginLeft: '20px' }}> {/* Augmentation de maxWidth à 900px */}
            <h4 style={{ textAlign: 'left' }}>Température</h4>
            <div style={{ height: '200px' }}>
                <Line data={temperatureData} options={temperatureOptions} />
            </div>
            <h4 style={{ textAlign: 'left' }}>Pression Artérielle</h4>
            <div style={{ height: '200px' }}>
                <Line data={bloodPressureData} options={bloodPressureOptions} />
            </div>
        </div>
    );
};

export default ChartDashboard;
