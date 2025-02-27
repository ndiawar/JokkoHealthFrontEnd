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
import user10 from '../../../assets/images/user/9.jpg';
import user11 from '../../../assets/images/user/10.jpg';
import user12 from '../../../assets/images/user/11.png';
import user13 from '../../../assets/images/user/12.png';

export const patientData = [
    {
        id: 1,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user1}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Ndiawar FALL</div>
            </Media>
        </Media>,
        email: 'ndiawarfall@gmail.com',
        status: <span className='badge badge-dark-danger'>Urgent</span>,
        diagnostic: 'Hypoxie',
    },
    {
        id: 2,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user2}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Omar Sall</div>
            </Media>
        </Media>,
        email: 'omar.sall@gmail.com',
        status: <span className='badge badge-dark-danger'>Urgent</span>,
        diagnostic: 'Crise d\'asthme',
    },
    {
        id: 3,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user3}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Babacar Sène</div>
            </Media>
        </Media>,
        email: 'babacar@gmail.com',
        status: <span className='badge badge-dark-danger'>Urgent</span>,
        diagnostic: 'Hypotension',
    },
    {
        id: 4,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user4}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Fatima Ndiaye</div>
            </Media>
        </Media>,
        email: 'fatima.ndiaye@gmail.com',
        status: <span className='badge badge-dark-danger'>Urgent</span>,
        diagnostic: 'Épilepsie',
    },
    {
        id: 5,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user5}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Daour Ndiongue</div>
            </Media>
        </Media>,
        email: 'daour08@gmail.com',
        status: <span className='badge badge-dark-danger'>Urgent</span>,
        diagnostic: 'Emphysème',
    },
    {
        id: 6,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user6}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Samathan Elong</div>
            </Media>
        </Media>,
        email: 'samathan@gmail.com',
        status: <span className='badge badge-dark-warning'>Alerte</span>,
        diagnostic: 'Post-AVC',
    },
    {
        id: 7,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user7}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Christ Ferly</div>
            </Media>
        </Media>,
        email: 'christ87fl@gmail.com',
        status: <span className='badge badge-dark-info'>Sous surveillance</span>,
        diagnostic: 'Fièvre',
    },
    {
        id: 8,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user8}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Mouhamed Ndao</div>
            </Media>
        </Media>,
        email: 'amethndao@gmail.com',
        status: <span className='badge badge-dark-info'>Sous surveillance</span>,
        diagnostic: 'Épilepsie',
    },
    {
        id: 9,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user9}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Abdoulaye Sy</div>
            </Media>
        </Media>,
        email: 'laye12@gmail.com',
        status: <span className='badge badge-dark-success'>Stable</span>,
        diagnostic: 'Parkinson',
    },
    {
        id: 10,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user10}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Jerome Ndong</div>
            </Media>
        </Media>,
        email: 'jerom.21@gmail.com',
        status: <span className='badge badge-dark-success'>Stable</span>,
        diagnostic: 'Diabète',
    },
    {
        id: 11,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user11}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Léonel Bénédicte</div>
            </Media>
        </Media>,
        email: 'leona15@gmail.com',
        status: <span className='badge badge-dark-success'>Stable</span>,
        diagnostic: 'Cancer',
    },
    {
        id: 12,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user12}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Théo Méliès</div>
            </Media>
        </Media>,
        email: 'theo.meliès@gmail.com',
        status: <span className='badge badge-dark-success'>Stable</span>,
        diagnostic: 'Accident vasculaire cérébral',
    },
    {
        id: 13,
        name: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user13}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>Mohamed Moussa</div>
            </Media>
        </Media>,
        email: 'amoussa@gmail.com',
        status: <span className='badge badge-dark-success'>Stable</span>,
        diagnostic: 'Accident cardiovasculaire',
    },
];


export const tableColumns = [
    {
        name: 'Name',
        selector: row => row['name'],
        sortable: true,
        center: false,
    },
    {
        name: 'Email',
        selector: row => row['email'],
        sortable: true,
        center: true,
    },
    {
        name: 'Status',
        selector: row => row['status'],
        sortable: true,
        center: true,
    },
    {
        name: 'Diagnostic',
        selector: row => row['diagnostic'],
        sortable: true,
        center: true,
    },
];
