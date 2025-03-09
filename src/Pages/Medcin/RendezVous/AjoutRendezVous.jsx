import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Col } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import CommonModal from '../../../Components/UiKits/Modals/common/modal';
import { FaClock, FaCalendar, FaUserMd } from 'react-icons/fa';
import { createAppointment } from '../../../api/ApiRendezVous'; // Importer la fonction d'API
import { toast } from 'react-toastify'; // Importer toast depuis react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importer le CSS de react-toastify
import './RendezVous.css'; // Importer le fichier CSS

const AjoutRendezVous = () => {
  const [SmallModalOpen, setSmallModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement

  const toggleLargeModal = () => setSmallModalOpen(!SmallModalOpen);

  const onSubmit = async (data) => {
    setIsLoading(true); // Activer l'état de chargement
    try {
      const response = await createAppointment(data); // Appeler l'API
      console.log('Rendez-vous créé avec succès:', response);

      // Afficher une notification de succès
      toast.success('Rendez-vous créé avec succès !', {
        position: "top-right",
        autoClose: 3000, // Fermer après 3 secondes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      toggleLargeModal(); // Fermer le modal après la création
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous:', error);

      // Afficher une notification d'erreur
      toast.error('Erreur lors de la création du rendez-vous.', {
        position: "top-right",
        autoClose: 3000, // Fermer après 3 secondes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false); // Désactiver l'état de chargement
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