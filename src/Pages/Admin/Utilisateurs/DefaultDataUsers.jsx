import React from 'react';
import { Media } from 'reactstrap';
import { Image } from '../../../AbstractElements';
import user1 from '../../../assets/images/user/1.jpg';
import user2 from '../../../assets/images/user/2.png';
import user3 from '../../../assets/images/user/3.jpg';
import user4 from '../../../assets/images/user/3.png';
import user5 from '../../../assets/images/user/4.jpg';
import user6 from '../../../assets/images/user/5.jpg';
import user7 from '../../../assets/images/user/6.jpg';
import user8 from '../../../assets/images/user/7.jpg';
import user9 from '../../../assets/images/user/8.jpg';
// import user10 from '../../../assets/images/user/9.jpg';
// import user11 from '../../../assets/images/user/10.jpg';
// import user12 from '../../../assets/images/user/11.png';
// import user13 from '../../../assets/images/user/12.png';



// Liste des patients avec leurs informations principales

export const usersData = [
    {
        id: 1,
        name: "Ndiawar Diop",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user1, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Ndiawar Diop</strong></div>
                </Media>
            </Media>
        ),
        email: 'medcin12@gmail.com',
        address: 'Dakar',
        phone: '78 542 12 14',
        matricule: 'jk-485-25',
    },
    {
        id: 2,
        name: "Alimatou Ndiaye",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user2, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Alimatou Ndiaye</strong></div>
                </Media>
            </Media>
        ),
        email: 'alima10@gmail.com',
        address: 'Ouackam',
        phone: '75 412 25 48',
        matricule: 'jk-448-25',
    },
    {
        id: 3,
        name: "Coumba Séne",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user3, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Coumba Séne</strong></div>
                </Media>
            </Media>
        ),
        email: 'senec2000@hotmail.com',
        address: 'Parcelle',
        phone: '77 541 89 63',
        matricule: 'jk-241-25',
    },
    {
        id: 4,
        name: "Fatou Ndiaye",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user4, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Fatou Ndiaye</strong></div>
                </Media>
            </Media>
        ),
        email: 'fandiaye20@gmail.com',
        address: 'Point-E',
        phone: '76 257 12 79',
        matricule: 'jk-257-25',
    },
    {
        id: 5,
        name: "Mamadou Bakary",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user5, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Mamadou Bakary</strong></div>
                </Media>
            </Media>
        ),
        email: 'bakary30@gmail.com',
        address: 'Bakel',
        phone: '77 541 89 63',
        matricule: 'jk-241-25',
    },
    {
        id: 6,
        name: "Moussa Diop",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user6, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Moussa Diop</strong></div>
                </Media>
            </Media>
        ),
        email: 'moussa@gmail.com',
        address: 'Parcelle',
        phone: '77 541 89 63',
        matricule: 'jk-241-25',
    },
    {
        id: 7,
        name: "Mamadou Bakary",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user7, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Mamadou Bakary</strong></div>
                </Media>
            </Media>
        ),
        email: 'bakary30@gmail.com',
        address: 'Bakel',
        phone: '77 541 89 63',
        matricule: 'jk-241-25',
    },
    {
        id: 8,
        name: "Moussa Diop",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user8, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Moussa Diop</strong></div>
                </Media>
            </Media>
        ),
        email: 'moussa@gmail.com',
        address: 'Parcelle',
        phone: '77 541 89 63',
        matricule: 'jk-241-25',
    },
    {
        id: 9,
        name: "Mamadou Bakary",
        nameComponent: (
            <Media className="d-flex">
                <Image attrImage={{ className: 'rounded-circle img-30 me-3', src: user9, alt: 'User' }} />
                <Media body className="align-self-center">
                    <div><strong>Mamadou Bakary</strong></div>
                </Media>
            </Media>
        ),
        email: 'bakary30@gmail.com',
        address: 'Bakel',
        phone: '77 541 89 63',
        matricule: 'jk-241-25',
    }
];

export const tableColumns = [
    {
        name: 'Utilisateurs',
        selector: row => row.nameComponent,
        sortable: true,
        center: false,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
        center: true,
    },
    {
        name: 'Adresse',
        selector: row => row.address,
        sortable: true,
        center: true,
    },
    {
        name: 'Téléphone',
        selector: row => row.phone,
        sortable: true,
        center: true,
    },
    {
        name: 'Matricule',
        selector: row => row.matricule,
        sortable: true,
        center: true,
    }
];
