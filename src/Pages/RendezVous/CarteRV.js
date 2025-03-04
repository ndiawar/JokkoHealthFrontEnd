// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// // import useAppointments from '../../Hooks/JokkoHealth/useAppointments';

// const CarteRv = () => {
//     // const { appointments, loading, error } = useAppointments();

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: { slidesToShow: 2, slidesToScroll: 1 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: { slidesToShow: 1, slidesToScroll: 1 },
//             },
//         ],
//     };

//     // if (loading) return <div>Chargement des rendez-vous...</div>;
//     // if (error) return <div>Erreur : {error}</div>;

//     return (
//         <div className="container my-4">
//             <style>
//                 {`
//                     .slick-prev:before,
//                     .slick-next:before {
//                         color: #12687B;
//                     }

//                     .card {
//                         background-color: white;
//                         color: black;
//                         border-radius: 15px;
//                         padding: 15px;
//                         text-align: center;
//                         height: 290px;
//                         display: flex;
//                         flex-direction: column;
//                         justify-content: space-between;
//                     }

//                     .profile-image {
//                         width: 50px;
//                         height: 50px;
//                         border-radius: 50%;
//                         object-fit: cover;
//                         margin-right: 10px;
//                     }

//                     .card-header {
//                         display: flex;
//                         align-items: center;
//                         justify-content: center;
//                         gap: 10px;
//                         margin-bottom: 8px;
//                     }

//                     .card-title {
//                         margin: 0;
//                         font-size: 1rem;
//                         font-weight: bold;
//                     }

//                     .text-muted {
//                         font-size: 0.85rem;
//                         color: gray;
//                         margin: 0;
//                     }

//                     .card-text {
//                         font-size: 0.9rem;
//                         margin-bottom: 12px;
//                     }

//                     .btn-with-icon {
//                         display: flex;
//                         align-items: center;
//                         justify-content: center;
//                         gap: 8px;
//                         font-size: 0.9rem;
//                         padding: 8px 12px;
//                     }
//                 `}
//             </style>

//             <Slider {...settings}>
//                 {appointments.map((appointment) => (
//                     <div key={appointment._id} className="px-3">
//                         <div className="card shadow">
//                             <div className="card-header">
//                                 <img
//                                     src={appointment.doctorImage || 'https://via.placeholder.com/50'}
//                                     alt="Médecin"
//                                     className="profile-image"
//                                 />
//                                 <div>
//                                     <h5 className="card-title">{appointment.doctorId?.nom}</h5>
//                                     <p className="text-muted">{appointment.specialiste} - {appointment.hospital}</p>
//                                     <p className="text-muted">Email: {appointment.doctorId?.email}</p>
//                                 </div>
//                             </div>

//                             <p className="card-text">
//                                 Cher(e) patient(e),<br />
//                                 Le Dr {appointment.doctorId?.nom} est disponible le{' '}
//                                 <strong>{new Date(appointment.date).toLocaleDateString()}</strong> de{' '}
//                                 <strong>{appointment.heure_debut}</strong> à{' '}
//                                 <strong>{appointment.heure_fin}</strong>.
//                             </p>

//                             <button className="btn btn-primary btn-with-icon">
//                                 <FontAwesomeIcon icon={faBell} style={{ color: 'yellow' }} />
//                                 Prenez rendez-vous maintenant
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default CarteRv;
