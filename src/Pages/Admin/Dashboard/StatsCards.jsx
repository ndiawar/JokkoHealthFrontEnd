import React from 'react';
import { BsPerson, BsPeople, BsPersonPlus, BsCalendar3 } from 'react-icons/bs';

const StatsCards = () => {
return (
    <div className="container-fluid"> {/* Modification ici */}
        <div className="row justify-content-center">
        <div className="col-12"> 
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-md-3">
              <InfoCard 
                title="Total Médecins"
                value="2.414"
                icon={<BsPerson style={{ color: '#12687B' }} className="fs-3" />}
              />
            </div>
            
            <div className="col-12 col-sm-6 col-md-3">
              <InfoCard
                title="Total du personnel"
                value="2.414"
                icon={<BsPeople style={{ color: '#12687B' }} className="fs-3" />}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <InfoCard
                title="Total des patients"
                value="2.414"
                icon={<BsPersonPlus style={{ color: '#12687B' }} className="fs-3" />}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <InfoCard
                title="Rendez-vous"
                value="2.414"
                icon={<BsCalendar3 style={{ color: '#12687B' }} className="fs-3" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, icon }) => (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white border rounded shadow-sm">
      <div>
        <h3 className="fs-6 text-secondary mb-1">{title}</h3>
        <p className="fs-4 fw-semibold text-dark mb-0">{value}</p>
      </div>
      <div className="bg-light rounded p-2">
        {icon}
      </div>
    </div>
  );

export default StatsCards;