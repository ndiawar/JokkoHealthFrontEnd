import React, { useState } from 'react';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import { FaSearch } from 'react-icons/fa'; // Import de l'icône de loupe

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm.trim()); // Supprime les espaces inutiles
  };

  return (
    <div className="d-flex justify-content-end mb-3">
      <InputGroup style={{ width: '700px' }}>
        {/* Icône de loupe à gauche */}
        <InputGroupText style={{ backgroundColor: '#ffffff', borderRight: 'none' }}>
          <FaSearch size={24} color="#12687B" />
        </InputGroupText>

        {/* Champ de recherche */}
        <Input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value); // Recherche en temps réel
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          style={{ borderLeft: 'none' }}
        />

        {/* Bouton de recherche */}
        <InputGroupText>
          <Button color="primary" onClick={handleSearch}>Recherche</Button>
        </InputGroupText>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
