import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './RendezVous.css'; // Assurez-vous d'avoir ce fichier CSS pour les styles personnalisés

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const dataLineHorsLigne = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            label: 'Consultations hors ligne',
            data: [10, 20, 15, 30, 25],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fond transparent
            fill: false,
            tension: 0.4,
        },
    ],
};

const dataLineEnLigne = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            label: 'Consultations en ligne',
            data: [15, 25, 20, 35, 30],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Fond transparent
            fill: false,
            tension: 0.4,
        },
    ],
};

const dataDoughnut = {
    labels: ['Patients', 'Non-patients'],
    datasets: [
        {
            label: 'Total des patients',
            data: [150, 47],
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            display: false,
        },
        y: {
            display: false,
        },
    },
};

const ResumeRendezVous = () => {
    return (
        <Row className="g-2">
            <Col xs={12} md={4}>
                <Card className="compact-card">
                    <Card.Body>
                        <Card.Title className="d-flex flex-column align-items-start">
                            <span>Consultations hors ligne</span>
                            <h2>101</h2>
                        </Card.Title>
                        <Line data={dataLineHorsLigne} options={options} />
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card className="compact-card">
                    <Card.Body>
                        <Card.Title className="d-flex flex-column align-items-start">
                            <span>Consultations en ligne</span>
                            <h2>96</h2>
                        </Card.Title>
                        <Line data={dataLineEnLigne} options={options} />
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card className="compact-card">
                    <Card.Body>
                        <Card.Title className="d-flex flex-column align-items-start">
                            <span>Total des patients</span>
                            <h2>197</h2>
                        </Card.Title>
                        <Doughnut data={dataDoughnut} options={options} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default ResumeRendezVous;
