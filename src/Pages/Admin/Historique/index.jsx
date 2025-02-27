import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { Breadcrumbs } from "../../../AbstractElements";
import Table from './Table';

function Historique() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <header style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
   

        <Breadcrumbs parent="Dashboard" title="Historique" style={{ marginTop: '5px' }} />
      </header>
      <h1 style={{ margin: 0, fontSize: '1.2em', fontWeight: 'bold' }}>Administration</h1>
      {/* Barre de recherche */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Table filtrée */}
      <div style={{ marginTop: '120px' }}>
        <Table searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default Historique;
