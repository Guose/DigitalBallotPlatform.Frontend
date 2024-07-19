import React from 'react'

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
  return (
    <tr>
        <td>
            <input
                type='text' 
                name='name' 
                value={editFormData.name}
                required='required' 
                placeholder='Enter first name...'
                onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
                type='text' 
                name='phoneNumber' 
                value={editFormData.phoneNumber}
                required='required' 
                placeholder='Enter phone number...'
                onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <input
                type='email' 
                name='email' 
                value={editFormData.email}
                required='required' 
                placeholder='Enter an email...' 
                onChange={handleEditFormChange}
            ></input>
        </td>
        <td>
            <button type='submit'>Save</button>
            <button type='button' onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  )
}

export default EditableRow