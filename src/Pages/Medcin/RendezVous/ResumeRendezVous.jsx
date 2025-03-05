import React from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { Line, Doughnut } from 'react-chartjs-2';
import { 
  useFetchAppointments,
  useFetchAcceptedAppointments,
  useFetchRejectedAppointments
} from '../../../Hooks/JokkoHealth/useRendezVous';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './RendezVous.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const ResumeRendezVous = () => {
  // Récupération des données via les hooks spécifiés
  const { data: allAppointments, isLoading: loadingAll } = useFetchAppointments();
  const { data: acceptedAppointments, isLoading: loadingAccepted } = useFetchAcceptedAppointments();
  const { data: rejectedAppointments, isLoading: loadingRejected } = useFetchRejectedAppointments();

  // Configuration commune des graphiques
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } }
  };

  // Calcul des métriques principales
  const totalAppointments = allAppointments?.length || 0;
  const acceptedCount = acceptedAppointments?.length || 0;
  const rejectedCount = rejectedAppointments?.length || 0;

  if (loadingAll || loadingAccepted || loadingRejected) {
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
              <h2>{totalAppointments}</h2>
            </Card.Title>
            <Line 
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                  data: [totalAppointments, 0, 0, 0, 0], // À adapter avec des données temporelles réelles
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
              <h2>{acceptedCount}</h2>
            </Card.Title>
            <Line 
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                  data: [acceptedCount, 0, 0, 0, 0], // À adapter avec des données temporelles réelles
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
              <span>Nombre de demandes</span>
              <h2>{acceptedCount + rejectedCount}</h2>
            </Card.Title>
            <Doughnut 
              data={{
                labels: ['Acceptés', 'Rejetés'],
                datasets: [{
                  data: [acceptedCount, rejectedCount],
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