import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { getAllAppointments, getAcceptedAppointmentRequests, getAppointmentsStatsByMonthForMedecin } from '../../../api/ApiRendezVous';
import './RendezVous.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const ResumeRendezVous = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    acceptedAppointments: 0,
    monthlyStats: []
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allAppointments, acceptedAppointments, monthlyStats] = await Promise.all([
        getAllAppointments(),
        getAcceptedAppointmentRequests(),
        getAppointmentsStatsByMonthForMedecin()
      ]);

      setStats({
        totalAppointments: allAppointments.length,
        acceptedAppointments: acceptedAppointments.length,
        monthlyStats: monthlyStats.stats || []
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Actualisation toutes les 30 secondes
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Row className="g-2">
      {/* Carte Tous les rendez-vous */}
      <Col xs={12} md={4}>
        <Card className="compact-card">
          <Card.Body>
            <Card.Title className="d-flex flex-column align-items-start">
              <span>Tous les rendez-vous</span>
              <h2>{stats.totalAppointments}</h2>
            </Card.Title>
            <Line 
              data={{
                labels: stats.monthlyStats.map(stat => `${stat.month}/${stat.year}`),
                datasets: [{
                  data: stats.monthlyStats.map(stat => stat.count),
                  borderColor: 'rgba(54, 162, 235, 1)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  fill: false,
                  tension: 0.4,
                }]
              }} 
              options={chartOptions} 
            />
          </Card.Body>
        </Card>
      </Col>

      {/* Carte Rendez-vous acceptés */}
      <Col xs={12} md={4}>
        <Card className="compact-card">
          <Card.Body>
            <Card.Title className="d-flex flex-column align-items-start">
              <span>Rendez-vous acceptés</span>
              <h2>{stats.acceptedAppointments}</h2>
            </Card.Title>
            <Line 
              data={{
                labels: stats.monthlyStats.map(stat => `${stat.month}/${stat.year}`),
                datasets: [{
                  data: stats.monthlyStats.map(stat => stat.acceptedCount || 0),
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: false,
                  tension: 0.4,
                }]
              }} 
              options={chartOptions} 
            />
          </Card.Body>
        </Card>
      </Col>

      {/* Carte Statistiques des demandes */}
      <Col xs={12} md={4}>
        <Card className="compact-card">
          <Card.Body>
            <Card.Title className="d-flex flex-column align-items-start">
              <span>Statistiques mensuelles</span>
              <h2>{stats.monthlyStats[stats.monthlyStats.length - 1]?.count || 0}</h2>
            </Card.Title>
            <Doughnut 
              data={{
                labels: ['Acceptés', 'En attente'],
                datasets: [{
                  data: [
                    stats.acceptedAppointments,
                    stats.totalAppointments - stats.acceptedAppointments
                  ],
                  backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                  ],
                  borderWidth: 1,
                }]
              }} 
              options={chartOptions} 
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ResumeRendezVous;