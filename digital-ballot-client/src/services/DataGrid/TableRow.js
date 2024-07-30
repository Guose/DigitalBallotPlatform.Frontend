// src/TableRow.js
import React, { useState } from 'react';
import Editable from './Editable';

const TableRow = ({ row, updateRow, fields }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault()
    setIsEditing(true)
    console.log(isEditing)
  };

  const handleSave = (updatedRow) => {
    updateRow(updatedRow);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Handle row deletion
  };

  return (
    <tr>
      {isEditing ? (
        <Editable row={row} onSave={handleSave} fields={fields} />
      ) : (
        <>
          {fields.map((field) => (
            <td key={field.name}>{row[field.name]}</td>
          ))}
          <td>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
