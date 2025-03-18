import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Badge } from 'reactstrap';
import { H5, H6, UL, LI, P } from '../../../AbstractElements';
import axios from 'axios';

const ActivityCard = () => {
    const [records, setRecords] = useState([]);
    const [pagination, setPagination] = useState({
        totalRecords: 0,
        totalPages: 0,
        currentPage: 1
    });

    const fetchMedicalRecords = async (page = 1) => {
        try {
            const response = await axios.get(`/medical/recent?page=${page}`);
            if (response.data.success) {
                setRecords(response.data.records);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des dossiers médicaux", error);
        }
    };

    // Fetch initial data
    useEffect(() => {
        fetchMedicalRecords();
    }, []);

    // Handle page change
    const handlePageChange = (newPage) => {
        fetchMedicalRecords(newPage);
    };

    // Fonction pour déterminer la couleur en fonction du statut
    const getStatusColor = (status) => {
        switch (status) {
            case 'urgent':
                return 'danger'; // Red badge
            case 'en traitement':
                return 'warning'; // Yellow badge
            case 'stable':
                return 'success'; // Green badge
            default:
                return 'secondary'; // Default grey badge
        }
    };

    return (
        <Col xxl="6" xl="6" md="6" sm="7" className="notification box-col-6">
            <Card className="height-equal">
                <CardHeader className="card-no-border">
                    <div className="header-top">
                        <H5 attrH5={{ className: 'm-0' }}>Dossiers Médicaux Récents</H5>
                    </div>
                </CardHeader>
                <CardBody className="pt-0">
                    <UL>
                        {records.map((item, i) => (
                            <LI key={i} attrLI={{ className: 'd-flex' }}>
                                <div className={`activity-dot-${getStatusColor(item.status)}`} />
                                <div className="w-100 ms-3">
                                    <P attrPara={{ className: 'd-flex justify-content-between mb-2' }}>
                                        <span className="date-content light-background">{new Date(item.createdAt).toLocaleDateString()}</span>
                                        <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
                                    </P>
                                    <H6>
                                        Patient: {item.patientId.nom} {item.patientId.prenom}
                                        <span className="dot-notification" />
                                    </H6>
                                    <p className="f-light">
                                        Status: <Badge color={getStatusColor(item.status)}>{item.status}</Badge>
                                    </p>
                                </div>
                            </LI>
                        ))}
                    </UL>

                    {/* Pagination */}
                    <Pagination>
                        <PaginationItem disabled={pagination.currentPage === 1}>
                            <PaginationLink previous onClick={() => handlePageChange(pagination.currentPage - 1)} />
                        </PaginationItem>
                        {[...Array(pagination.totalPages)].map((_, i) => (
                            <PaginationItem key={i} active={pagination.currentPage === i + 1}>
                                <PaginationLink
                                    onClick={() => handlePageChange(i + 1)}
                                    style={{ backgroundColor: '#1D6372', color: 'white', border: 'none' }}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem disabled={pagination.currentPage === pagination.totalPages}>
                            <PaginationLink next onClick={() => handlePageChange(pagination.currentPage + 1)} />
                        </PaginationItem>
                    </Pagination>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ActivityCard;
