import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AppointmentCard = ({ appointments }) => {
    const [status, setStatus] = useState(Array(appointments.length).fill(null));
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageToday, setCurrentPageToday] = useState(0);
    const appointmentsPerPage = 6;

    const handleConfirm = (index) => {
        const newStatus = [...status];
        newStatus[index] = 'confirmed';
        setStatus(newStatus);
    };

    const handleCancel = (index) => {
        const newStatus = [...status];
        newStatus[index] = 'cancelled';
        setStatus(newStatus);
    };

    // Filtrer les rendez-vous pour n'afficher que ceux du jour
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    const todayAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
        return appointmentDate === today && appointment.status === 'confirmed';
    });

    const paginate = (appointments, currentPage, appointmentsPerPage) => {
        const startIndex = currentPage * appointmentsPerPage;
        return appointments.slice(startIndex, startIndex + appointmentsPerPage);
    };

    const paginatedAppointments = paginate(appointments, currentPage, appointmentsPerPage);
    const paginatedTodayAppointments = paginate(todayAppointments, currentPageToday, appointmentsPerPage);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Rendez-vous</h5>
                        </div>
                        <div className="card-body">
                            {paginatedAppointments.map((appointment, index) => (
                                <div key={appointment.id} className="d-flex align-items-center mb-2">
                                    <img src={appointment.avatar} alt="Avatar" className="rounded-circle me-3" style={{ width: '30px', height: '30px' }} />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{appointment.name}</h6>
                                        <small className="text-muted">{new Date(appointment.date).toLocaleString()}</small>
                                    </div>
                                    <div className="ms-auto d-flex">
                                        {status[appointment.id - 1] === 'confirmed' ? (
                                            <span className="badge bg-success me-2">Confirmé</span>
                                        ) : (
                                            <button onClick={() => handleConfirm(appointment.id - 1)} className="btn btn-success btn-sm me-2" style={{ fontSize: '0.8rem' }}>
                                                <FaCheck />
                                            </button>
                                        )}
                                        {status[appointment.id - 1] === 'cancelled' ? (
                                            <span className="badge bg-danger">Annulé</span>
                                        ) : (
                                            <button onClick={() => handleCancel(appointment.id - 1)} className="btn btn-danger btn-sm" style={{ fontSize: '0.8rem' }}>
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                                disabled={currentPage === 0}
                            >
                                Précédent
                            </button>
                            <span>{currentPage + 1}</span>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(appointments.length / appointmentsPerPage) - 1))}
                                disabled={currentPage >= Math.ceil(appointments.length / appointmentsPerPage) - 1}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Rendez-vous du jour</h5>
                        </div>
                        <div className="card-body">
                            {paginatedTodayAppointments.map((appointment) => (
                                <div key={appointment.id} className="d-flex align-items-center mb-2">
                                    <img src={appointment.avatar} alt="Avatar" className="rounded-circle me-3" style={{ width: '30px', height: '30px' }} />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{appointment.name}</h6>
                                        <small className="text-muted">{new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setCurrentPageToday(prev => Math.max(prev - 1, 0))}
                                disabled={currentPageToday === 0}
                            >
                                Précédent
                            </button>
                            <span>{currentPageToday + 1}</span>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setCurrentPageToday(prev => Math.min(prev + 1, Math.ceil(todayAppointments.length / appointmentsPerPage) - 1))}
                                disabled={currentPageToday >= Math.ceil(todayAppointments.length / appointmentsPerPage) - 1}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;
