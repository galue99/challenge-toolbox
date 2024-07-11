import React from 'react';
import { Form } from 'react-bootstrap';

const FileFilter = ({ filter, setFilter }) => {
  return (
    <div className="mb-3">
      <Form.Control
        type="text"
        placeholder="Filtrar por nombre de archivo"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  );
};

export default FileFilter;
