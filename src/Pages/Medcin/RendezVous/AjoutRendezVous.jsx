import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Col } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import CommonModal from '../../../Components/UiKits/Modals/common/modal';
import { FaClock, FaCalendar, FaUserMd } from 'react-icons/fa';
import { createAppointment } from '../../../api/ApiRendezVous';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RendezVous.css';

const AjoutRendezVous = () => {
  const [SmallModalOpen, setSmallModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const toggleLargeModal = () => {
    setSmallModalOpen(!SmallModalOpen);
    if (!SmallModalOpen) {
      reset(); // Réinitialiser le formulaire quand on ouvre le modal
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Validation de la date et de l'heure
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Si la date est aujourd'hui, vérifier que l'heure n'est pas passée
      if (selectedDate.getTime() === today.getTime()) {
        const currentHour = new Date().getHours();
        const currentMinutes = new Date().getMinutes();
        const [debutHeures, debutMinutes] = data.heure_debut.split(':').map(Number);

        if (debutHeures < currentHour || (debutHeures === currentHour && debutMinutes <= currentMinutes)) {
          toast.error('L\'heure de début doit être dans le futur');
          return;
        }
      } else if (selectedDate < today) {
        toast.error('La date doit être dans le futur');
        return;
      }

      // Validation des heures de début et de fin
      const [debutHeures, debutMinutes] = data.heure_debut.split(':').map(Number);
      const [finHeures, finMinutes] = data.heure_fin.split(':').map(Number);
      
      if (finHeures < debutHeures || (finHeures === debutHeures && finMinutes <= debutMinutes)) {
        toast.error('L\'heure de fin doit être après l\'heure de début');
        return;
      }

      await createAppointment({
        date: data.date,
        heure_debut: data.heure_debut,
        heure_fin: data.heure_fin,
        specialiste: data.specialiste
      });

      toast.success('Rendez-vous créé avec succès !');
      toggleLargeModal();
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la création du rendez-vous');
    } finally {
      setIsLoading(false);
    }
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
            <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
              <div className="form-group">
                <label>
                  <FaCalendar /> Date:
                  <input
                    type="date"
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    {...register('date', { 
                      required: 'La date est requise',
                      validate: value => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return selectedDate >= today || 'La date doit être dans le futur';
                      }
                    })}
                  />
                </label>
                {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
              </div>

              <div className="form-group">
                <label>
                  <FaClock /> Heure de début:
                  <input
                    type="time"
                    className={`form-control ${errors.heure_debut ? 'is-invalid' : ''}`}
                    {...register('heure_debut', { required: 'L\'heure de début est requise' })}
                  />
                </label>
                {errors.heure_debut && <div className="invalid-feedback">{errors.heure_debut.message}</div>}
              </div>

              <div className="form-group">
                <label>
                  <FaClock /> Heure de fin:
                  <input
                    type="time"
                    className={`form-control ${errors.heure_fin ? 'is-invalid' : ''}`}
                    {...register('heure_fin', { required: 'L\'heure de fin est requise' })}
                  />
                </label>
                {errors.heure_fin && <div className="invalid-feedback">{errors.heure_fin.message}</div>}
              </div>

              <div className="form-group">
                <label>
                  <FaUserMd /> Spécialiste:
                  <select
                    className={`form-control ${errors.specialiste ? 'is-invalid' : ''}`}
                    {...register('specialiste', { required: 'Le spécialiste est requis' })}
                  >
                    <option value="">Sélectionner un spécialiste</option>
                    <option value="cardiologue">Cardiologue</option>
                    <option value="dermatologue">Dermatologue</option>
                    <option value="dentiste">Dentiste</option>
                    <option value="ophtalmologue">Ophtalmologue</option>
                    <option value="généraliste">Généraliste</option>
                  </select>
                </label>
                {errors.specialiste && <div className="invalid-feedback">{errors.specialiste.message}</div>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mt-3" 
                disabled={isLoading}
              >
                {isLoading ? 'Création en cours...' : 'Créer le rendez-vous'}
              </button>
            </form>
          </CommonModal>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AjoutRendezVous;