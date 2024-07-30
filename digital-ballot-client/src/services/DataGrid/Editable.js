import React, { useState } from 'react';

const Editable = ({ row, onSave, fields }) => {
  const [formData, setFormData] = useState({ ...row })

  const handleChange = (e) => {
    e.preventDefault()

    const { name, value } = e.target
    console.log('name: ' + name + 'value: ' + value)
    setFormData({ ...formData, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }
  
  return (
    <>
      {fields.map((field) => (
      <td key={field.name}>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
        />
      </td>
    ))} 
    <td>
      <button type='submit' onClick={handleSubmit}>Save</button>
    </td>
    </>
  )
}

export default Editable
