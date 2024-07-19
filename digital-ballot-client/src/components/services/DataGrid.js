import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DATA_URL = ''

const DataGrid = () => {
  const [data, setData] = useState([])
  const [newRow, setNewRow] = useState({ name: '', age: '', email: '' })

  useEffect(() => {
    axios.get(DATA_URL)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const newData = [...data]
    newData[index][name] = value
    setData(newData)
  }

  const handleAddRowChange = (e) => {
    const { name, value } = e.target
    setNewRow({ ...newRow, [name]: value })
  }

  const handleSaveNewRow = () => {
    setData([...data, newRow])
    setNewRow({ name: '', age: '', email: '' })
  }

  const handleDeleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index)
    setData(newData)
  }

  return (
    <div className="DataGrid">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <input 
                  type="text" 
                  name="name" 
                  value={row.name} 
                  onChange={(e) => handleInputChange(e, index)} 
                />
              </td>
              <td>
                <input 
                  type="text" 
                  name="age" 
                  value={row.age} 
                  onChange={(e) => handleInputChange(e, index)} 
                />
              </td>
              <td>
                <input 
                  type="text" 
                  name="email" 
                  value={row.email} 
                  onChange={(e) => handleInputChange(e, index)} 
                />
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input 
                type="text" 
                name="name" 
                value={newRow.name} 
                onChange={handleAddRowChange} 
                placeholder="New Name" 
              />
            </td>
            <td>
              <input 
                type="text" 
                name="age" 
                value={newRow.age} 
                onChange={handleAddRowChange} 
                placeholder="New Age" 
              />
            </td>
            <td>
              <input 
                type="text" 
                name="email" 
                value={newRow.email} 
                onChange={handleAddRowChange} 
                placeholder="New Email" 
              />
            </td>
            <td>
              <button onClick={handleSaveNewRow}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DataGrid
