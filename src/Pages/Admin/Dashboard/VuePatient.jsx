import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap'; // Importation du composant Card
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMonthlyPatientsAndMedecins } from '../../../api/filteruser'; // Importez la méthode

const PatientOverview = () => {
    const [timeRange, setTimeRange] = useState('month');
    const [data, setData] = useState([]); // État pour stocker les données dynamiques
    const colors = { Medecin: '#12687B', Patient: '#1593AF' }; // Couleurs pour les lignes du graphique

    // Charger les données au montage du composant
    useEffect(() => {
        const loadData = async () => {
            try {
                const monthlyData = await fetchMonthlyPatientsAndMedecins(); // Appel de la méthode
                if (monthlyData) {
                    // Transformer les données pour les adapter au graphique20
                    const transformedData = [
                        { period: 'Mois en cours', Medecin: monthlyData.medecins, Patient: monthlyData.patients }
                    ];
                    setData(transformedData); // Mettre à jour l'état avec les données transformées
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données mensuelles:", error);
            }
        };

        loadData();
    }, []);

    return (
        <div style={{ padding: '1rem' }}>
            {/* Carte contenant le graphique */}
            <Card>
                <Card.Header as="h5">
                    {/* En-tête avec titre, filtre et légende */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginBottom: '1rem'
                    }}>
                        <h3 style={{ color: '#000000', margin: 0 }}>Vue d'ensemble des patients et médecins</h3>
                        
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <select 
                                value={timeRange} 
                                onChange={(e) => setTimeRange(e.target.value)}
                                style={{ 
                                    padding: '5px 10px',
                                    border: `2px solid ${colors.Medecin}`,
                                    borderRadius: '4px',
                                    color: colors.Medecin
                                }}
                            >
                                <option value="month">Mois</option>
                                <option value="week">Semaine</option>
                                <option value="year">Année</option>
                            </select>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <div style={{ width: '12px', height: '12px', backgroundColor: colors.Medecin }}/>
                                    <span style={{ color: colors.Medecin }}>Médecins</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <div style={{ width: '12px', height: '12px', backgroundColor: colors.Patient }}/>
                                    <span style={{ color: colors.Patient }}>Patients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    {/* Graphique */}
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <XAxis 
                                dataKey="period" 
                                tick={{ fill: '#12687B' }}
                                axisLine={{ stroke: '#1593AF' }}
                            />
                            <YAxis 
                                tick={{ fill: '#12687B' }}
                                axisLine={{ stroke: '#1593AF' }}
                            />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="Medecin"
                                stroke={colors.Medecin}
                                strokeWidth={2}
                                dot={{ fill: colors.Medecin }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Patient"
                                stroke={colors.Patient}
                                strokeWidth={2}
                                dot={{ fill: colors.Patient }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PatientOverview;