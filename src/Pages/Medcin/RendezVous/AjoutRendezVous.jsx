import React, { useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import CommonModal from '../../../Components/UiKits/Modals/common/modal';
import { FaClock, FaCalendar, FaUserMd } from 'react-icons/fa';
import './RendezVous.css'; // Importer le fichier CSS

const AjoutRendezVous = () => {
  const [SmallModalOpen, setSmallModalOpen] = useState(false);

  const toggleLargeModal = () => setSmallModalOpen(!SmallModalOpen);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique pour ajouter le rendez-vous
    toggleLargeModal();
  };

  return (
    <Col sm="12">
      <Card className="card-transparent">
        <CardBody>
          <Btn
              attrBtn={{
                style: { backgroundColor: '#409D9B', color: 'white' },
                onClick: toggleLargeModal
              }}
            >
              <FaClock /> Programmer un rendez-vous
          </Btn>

          <CommonModal
            isOpen={SmallModalOpen}
            title="Programmer un rendez-vous"
            toggler={toggleLargeModal}
            size="md"
            bodyClass="modal-content"
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Date:
                  <input type="date" name="date" required />
                  <FaCalendar />
                </label>
              </div>
              <div>
                <label>
                  Heure de début:
                  <input type="time" name="heureDebut" required />
                  <FaClock />
                </label>
              </div>
              <div>
                <label>
                  Heure de fin:
                  <input type="time" name="heureFin" required />
                  <FaClock />
                </label>
              </div>
              <div>
                <label>
                  Spécialiste:
                  <select name="specialiste" required>
                    <option value="">Sélectionner un spécialiste</option>
                    <option value="cardiologue">Cardiologue</option>
                    <option value="dermatologue">Dermatologue</option>
                    <option value="dentiste">Dentiste</option>
                  </select>
                  <FaUserMd />
                </label>
              </div>
              <button type="submit" className="submit-button btn-custom-color">
                Ajouter
              </button>
            </form>
          </CommonModal>
        </CardBody>
      </Card>
    </Col>
  );
  
};

export default AjoutRendezVous;
