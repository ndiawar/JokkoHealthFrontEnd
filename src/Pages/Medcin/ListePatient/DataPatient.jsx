import React, { Fragment, useCallback, useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import { Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { usePatientData, tableColumns } from './DefaultDataPatient';
import { FaTrash, FaChartBar } from 'react-icons/fa';
import { useDeleteMedicalRecord } from '../../../Hooks/JokkoHealth/useMedical';
import { confirmAlert } from 'react-confirm-alert'; // Importer react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importer le CSS de react-confirm-alert
import './DataPatient.css';
import _ from 'lodash'; // Importer lodash pour la comparaison profonde
import PatientCard from './DetailPatient'; // Importer le composant PatientCard

const useDeepCompareEffect = (callback, dependencies) => {
  const ref = useRef();

  if (!_.isEqual(dependencies, ref.current)) {
    ref.current = dependencies;
  }

  useEffect(callback, [ref.current]);
};

const DataPatient = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelet, setToggleDelet] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [data, setData] = useState([]); // Définir data et setData
  const [selectedPatient, setSelectedPatient] = useState(null); // État pour le patient sélectionné
  const [modal, setModal] = useState(false); // État pour la modal

  const { patientData, error, isLoading } = usePatientData();
  const deleteMedicalRecordMutation = useDeleteMedicalRecord();

  // Mettre à jour les données lorsque patientData change
  useDeepCompareEffect(() => {
    if (patientData) {
      setData(patientData);
    }
  }, [patientData]); // Plus besoin de vérifier 'data', patientData suffit

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = (row) => {
    const rowsToDelete = row ? [row] : selectedRows;
    confirmAlert({
      title: 'Confirmation de suppression',
      message: `Êtes-vous sûr de vouloir supprimer :\r ${rowsToDelete.map(r => extractText(r.name)).join(', ')}?`,
      buttons: [
        {
          label: 'Oui',
          onClick: () => {
            rowsToDelete.forEach(row => {
              deleteMedicalRecordMutation.mutate(row.id, {
                onSuccess: () => {
                  setData(data.filter(item => item.id !== row.id));
                  setSelectedRows([]);
                }
              });
            });
            setToggleDelet(!toggleDelet);
          }
        },
        {
          label: 'Non',
          onClick: () => {}
        }
      ]
    });
  };

  const handleDetails = (row) => {
    setSelectedPatient(row.patientDetails); // Mettre à jour l'état avec le patient sélectionné
    setModal(true); // Ouvrir la modal
  };

  const toggleModal = () => {
    setModal(!modal); // Fermer la modal
  };

  const actionButtons = (row) => (
    <>
      <Btn attrBtn={{ color: 'transparent', style: { background: 'none', border: 'none' }, onClick: () => handleDelete(row) }}>
        <FaTrash style={{ color: 'red' }} />
      </Btn>
      <Btn attrBtn={{ color: 'transparent', style: { background: 'none', border: 'none' }, onClick: () => handleDetails(row) }}>
        <FaChartBar style={{ color: 'green' }} />
      </Btn>
    </>
  );

  const customColumns = [
    ...tableColumns,
    {
      name: 'Actions',
      cell: row => actionButtons(row),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Fonction d'extraction du texte brut depuis le JSX
  const extractText = (element) => {
    if (typeof element === 'string') {
      return element;
    } else if (element.props && element.props.children) {
      return extractText(element.props.children);
    } else if (Array.isArray(element)) {
      return element.map(extractText).join(' ');
    }
    return '';
  };

  const filteredData = data.filter(row =>
    extractText(row.name).toLowerCase().includes(filterText.toLowerCase()) ||
    row.email.toLowerCase().includes(filterText.toLowerCase()) ||
    row.diagnostic.toLowerCase().includes(filterText.toLowerCase())
  );

  if (isLoading) return <div>Chargement des données...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <Fragment>
      <div className="search-container">
        <Input
          type="text"
          placeholder="Recherche..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="search-input"
        />
      </div>
      {selectedRows.length !== 0 && (
        <div className={`d-flex align-items-center justify-content-between bg-light-info p-2`}>
          <H4 attrH4={{ className: 'text-muted m-0' }}>Supprimer les données sélectionnées..!</H4>
          <Btn attrBtn={{ color: 'danger', onClick: () => handleDelete() }}>Supprimer</Btn>
        </div>
      )}
      <DataTable
        data={filteredData}
        columns={customColumns}
        striped={true}
        center={true}
        pagination
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleDelet}
      />
      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Détails du Patient</ModalHeader>
        <ModalBody>
          {selectedPatient && (
            <PatientCard patient={selectedPatient} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Fermer</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default DataPatient;