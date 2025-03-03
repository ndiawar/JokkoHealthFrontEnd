import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Col } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import CommonModal from '../../../Components/UiKits/Modals/common/modal';
import { FaClock, FaCalendar, FaUserMd } from 'react-icons/fa';
import { useCreateAppointment } from '../../../Hooks/JokkoHealth/useRendezVous';
import './RendezVous.css'; // Importer le fichier CSS

const AjoutRendezVous = () => {
  const [SmallModalOpen, setSmallModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: createAppointment, isLoading } = useCreateAppointment();

  const toggleLargeModal = () => setSmallModalOpen(!SmallModalOpen);

  const onSubmit = (data) => {
    createAppointment(data, {
      onSuccess: () => {
        toggleLargeModal();
      },
      onError: (error) => {
        console.error('Erreur lors de la création du rendez-vous:', error);
      }
    });
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    {...register('date', { required: 'La date est requise' })}
                  />
                  <FaCalendar />
                </label>
                {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
              </div>
              <div className="form-group">
                <label>
                  Heure de début:
                  <input
                    type="time"
                    name="heure_debut"
                    className={`form-control ${errors.heure_debut ? 'is-invalid' : ''}`}
                    {...register('heure_debut', { required: 'L\'heure de début est requise' })}
                  />
                  <FaClock />
                </label>
                {errors.heure_debut && <div className="invalid-feedback">{errors.heure_debut.message}</div>}
              </div>
              <div className="form-group">
                <label>
                  Heure de fin:
                  <input
                    type="time"
                    name="heure_fin"
                    className={`form-control ${errors.heure_fin ? 'is-invalid' : ''}`}
                    {...register('heure_fin', { required: 'L\'heure de fin est requise' })}
                  />
                  <FaClock />
                </label>
                {errors.heure_fin && <div className="invalid-feedback">{errors.heure_fin.message}</div>}
              </div>
              <div className="form-group">
                <label>
                  Spécialiste:
                  <select
                    name="specialiste"
                    className={`form-control ${errors.specialiste ? 'is-invalid' : ''}`}
                    {...register('specialiste', { required: 'Le spécialiste est requis' })}
                  >
                    <option value="">Sélectionner un spécialiste</option>
                    <option value="cardiologue">Cardiologue</option>
                    <option value="dermatologue">Dermatologue</option>
                    <option value="dentiste">Dentiste</option>
                    <option value="ophtamologue">Ophtamologue</option>
                  </select>
                  <FaUserMd />
                </label>
                {errors.specialiste && <div className="invalid-feedback">{errors.specialiste.message}</div>}
              </div>
              <button type="submit" className="submit-button btn-custom-color" disabled={isLoading}>
                {isLoading ? 'Chargement...' : 'Ajouter'}
              </button>
            </form>
          </CommonModal>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AjoutRendezVous;