import React, { Fragment, useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import { Input } from 'reactstrap'; // Assurez-vous que ce chemin est correct
import { usePatientData, tableColumns } from './DefaultDataPatient';
import { FaTrash, FaChartBar } from 'react-icons/fa';
import './DataPatient.css';

const DataPatient = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelet, setToggleDelet] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [data, setData] = useState([]); // Définir data et setData

  const { patientData, error, isLoading } = usePatientData();

  // Mettre à jour les données lorsque patientData change
  useEffect(() => {
    if (patientData && patientData !== data) {
      setData(patientData);
    }
  }, [patientData, data]); // Nous ajoutons data ici pour éviter une boucle infinie

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer :\r ${selectedRows.map(r => r.name)}?`)) {
      setToggleDelet(!toggleDelet);
      setData(data.filter(item => !selectedRows.some(elem => elem.id === item.id)));
      setSelectedRows([]);
    }
  };

  const handleDetails = (row) => {
    console.log("Details for:", row);
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

  const filteredData = data.filter(
    row =>
      extractText(row.name).toLowerCase().includes(filterText.toLowerCase()) ||
      row.email.toLowerCase().includes(filterText.toLowerCase()) ||
      row.diagnostic.toLowerCase().includes(filterText.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Fragment>
      <div className="search-container">
        <Input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="search-input"
        />
      </div>
      {selectedRows.length !== 0 && (
        <div className={`d-flex align-items-center justify-content-between bg-light-info p-2`}>
          <H4 attrH4={{ className: 'text-muted m-0' }}>Delete Selected Data..!</H4>
          <Btn attrBtn={{ color: 'danger', onClick: handleDelete }}>Delete</Btn>
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
    </Fragment>
  );
};

export default DataPatient;
