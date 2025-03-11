import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

// Couleurs mises à jour
const oxygenSaturationColor = '#FFC107'; // Jaune pour la saturation en oxygène
const bloodPressureColor = '#DC3545'; // Rouge pour la pression artérielle

const ChartDashboard = () => {
    const [chartData, setChartData] = useState({
        oxygenSaturation: {
            labels: [],
            datasets: [],
        },
        bloodPressure: {
            labels: [],
            datasets: [],
        },
    });

    const fetchSensorData = async () => {
        try {
            const response = await axios.get('/sensorPoul');
            const data = response.data;

            // Vérification que les données ne sont pas vides ou indéfinies
            if (data && Array.isArray(data)) {
                // Tri des données par timestamp
                const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                const oxygenLevels = sortedData.map(entry => entry.oxygenLevel); // Assurez-vous que c'est un pourcentage
                const heartRates = sortedData.map(entry => entry.heartRate);
                const timestamps = sortedData.map(entry => new Date(entry.timestamp).toLocaleTimeString()); // Utilisez des timestamps réels

                setChartData({
                    oxygenSaturation: {
                        labels: timestamps,
                        datasets: [
                            {
                                label: 'Saturation en Oxygène (%)',
                                data: oxygenLevels,
                                borderColor: oxygenSaturationColor,
                                backgroundColor: 'rgba(255, 193, 7, 0.4)',
                                borderWidth: 2,
                            },
                        ],
                    },
                    bloodPressure: {
                        labels: timestamps,
                        datasets: [
                            {
                                label: 'Pression Artérielle (bpm)',
                                data: heartRates,
                                borderColor: bloodPressureColor,
                                backgroundColor: 'rgba(220, 53, 69, 0.4)',
                                borderWidth: 2,
                            },
                        ],
                    },
                });
            } else {
                console.error("Données non valides reçues :", data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    useEffect(() => {
        fetchSensorData();
        const intervalId = setInterval(fetchSensorData, 5000); // Mettre à jour toutes les 5 secondes

        return () => clearInterval(intervalId);
    }, []);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: { display: false },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    color: '#333', // Couleur des ticks
                    font: {
                        size: 12, // Taille de la police des ticks
                    },
                    callback: (value) => {
                        return value + '%'; // Ajouter le symbole de pourcentage
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // Couleur de la grille
                },
            },
            x: {
                ticks: {
                    color: '#333', // Couleur des ticks
                    font: {
                        size: 12, // Taille de la police des ticks
                    },
                },
                grid: {
                    display: false, // Masquer la grille sur l'axe des X
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '900px', margin: 'auto', marginLeft: '20px' }}>
            <h4 style={{ textAlign: 'left' }}>Saturation en Oxygène</h4>
            <div style={{ height: '200px' }}>
                <Line data={chartData.oxygenSaturation} options={options} />
            </div>
            <h4 style={{ textAlign: 'left' }}>Pression Artérielle</h4>
            <div style={{ height: '200px' }}>
                <Line data={chartData.bloodPressure} options={options} />
            </div>
        </div>
    );
};

export default ChartDashboard;
