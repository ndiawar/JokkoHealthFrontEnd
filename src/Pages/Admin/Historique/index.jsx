import React from 'react';
import { Breadcrumbs } from "../../../AbstractElements";
import Table from './Table';

function Historique() {

  return (
    <>
      <Breadcrumbs mainTitle="Historique" parent="Administrateur" title="Historique" />
      
      <div style={{ marginTop: '120px' }}>
        <Table />
      </div>
    </>
  );
}

export default Historique;
