import React from 'react'

const ReadOnlyRow = ({user, handleEditClick, handleDeleteUserClick}) => {

  return (
        <tr className='row'>
            <td>{user.name}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.email}</td>
            <td>
              <button type='button' onClick={(event) => handleEditClick(event, user)}>Edit</button>
              <button type='button' onClick={() => handleDeleteUserClick(user.id)}>Delete</button>
            </td>
        </tr>
  )
}

export default ReadOnlyRow