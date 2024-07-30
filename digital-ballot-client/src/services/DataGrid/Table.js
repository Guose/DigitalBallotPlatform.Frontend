import React from 'react'
import TableRow from './TableRow'
import '../../shared/styles/tables.css'

const Table = ({ data, updateRow, fields }) => {

  return (
    <div className='table-container'>
      <table className='content-table'>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.name}>{field.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} row={row} updateRow={updateRow} fields={fields} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table
