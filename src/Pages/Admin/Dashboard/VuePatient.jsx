import React, { useState } from 'react';
import { Card } from 'react-bootstrap'; // Importation du composant Card
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  month: [
    { period: 'Jan', Homme: 320, Femme: 210 },
    { period: 'Fév', Homme: 290, Femme: 230 },
    { period: 'Mar', Homme: 410, Femme: 270 },
    { period: 'Avr', Homme: 380, Femme: 250 },
    { period: 'Mai', Homme: 450, Femme: 350 },
    { period: 'Juin', Homme: 500, Femme: 420 },
    { period: 'Juil', Homme: 530, Femme: 480 },
    { period: 'Août', Homme: 510, Femme: 550 },
    { period: 'Sept', Homme: 460, Femme: 460 },
    { period: 'Oct', Homme: 490, Femme: 510 },
    { period: 'Nov', Homme: 420, Femme: 550 },
    { period: 'Déc', Homme: 480, Femme: 620 }
  ],
  
  week: [
    { period: 'Sem 1', Homme: 80, Femme: 55 },
    { period: 'Sem 2', Homme: 75, Femme: 60 },
    { period: 'Sem 3', Homme: 85, Femme: 70 },
    { period: 'Sem 4', Homme: 90, Femme: 80 },
    { period: 'Sem 5', Homme: 95, Femme: 85 }
  ],

  day: [
    { period: 'Lun', Homme: 50, Femme: 40 },
    { period: 'Mar', Homme: 55, Femme: 45 },
    { period: 'Mer', Homme: 60, Femme: 50 },
    { period: 'Jeu', Homme: 65, Femme: 55 },
    { period: 'Ven', Homme: 70, Femme: 65 },
    { period: 'Sam', Homme: 80, Femme: 75 },
    { period: 'Dim', Homme: 90, Femme: 85 }
  ],

  year: [
    { period: '2021', Homme: 4200, Femme: 2500 },
    { period: '2022', Homme: 4800, Femme: 2800 },
    { period: '2023', Homme: 5300, Femme: 3400 },
    { period: '2024', Homme: 5600, Femme: 4000 },
    { period: '2025', Homme: 6000, Femme: 4600 },
    { period: '2026', Homme: 6300, Femme: 5000 }
  ]
};

const PatientOverview = () => {
  const [timeRange, setTimeRange] = useState('month');
  const colors = { Homme: '#12687B', Femme: '#1593AF' };

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
                <h3 style={{ color: '#000000', margin: 0 }}>Vue d'ensemble des patients</h3>
                
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <select 
                    value={timeRange} 
                    onChange={(e) => setTimeRange(e.target.value)}
                    style={{ 
                    padding: '5px 10px',
                    border: `2px solid ${colors.Homme}`,
                    borderRadius: '4px',
                    color: colors.Homme
                    }}
                >
                    <option value="month">Mois</option>
                    <option value="week">Semaine</option>
                    <option value="year">Année</option>
                </select>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: colors.Homme }}/>
                    <span style={{ color: colors.Homme }}>Homme</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: colors.Femme }}/>
                    <span style={{ color: colors.Femme }}>Femme</span>
                    </div>
                </div>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
          {/* Graphique */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={mockData[timeRange]}
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
                dataKey="Homme"
                stroke={colors.Homme}
                strokeWidth={2}
                dot={{ fill: colors.Homme }}
              />
              <Line
                type="monotone"
                dataKey="Femme"
                stroke={colors.Femme}
                strokeWidth={2}
                dot={{ fill: colors.Femme }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientOverview;
