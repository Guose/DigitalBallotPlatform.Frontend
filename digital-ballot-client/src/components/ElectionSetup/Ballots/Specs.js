import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '../../../services/DataGrid/Table'
import './ballotStyle.css'

const BASE_URL = 'http://localhost:3001/BallotSpec'
const fields = [
    {name: 'length', label: 'Length', type: 'number'},
    {name: 'width', label: 'Width', type: 'number'},
    {name: 'pages', label: 'Pages', type: 'number'},
    {name: 'stubSize', label: 'Stub Size', type: 'number'},
    {name: 'isTopStub', label: 'Tob Stub', type: 'checkbox'},
    {name: 'isDuplex', label: 'Duplex', type: 'checkbox'},
    {name: 'enabled', label: 'Enable', type: 'checkbox'},
]

const Category = () => {
  const [loading, setLoading] = useState(true)
  const [specData, setSpecData] = useState([])  

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get(`${BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('spec response:', res.data)
        setSpecData(res.data)
      } catch (error) {
        console.error('Error fetching ballot Specs', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const updateRow = async (updatedRow) => {
    setSpecData(specData.map(row => row.id === updatedRow.id ? updateRow : row))
    console.log(updateRow)
    await axios.put(BASE_URL, updateRow)
    .then((response) => {
      console.log('Update response', response.data)
    })
    .catch(err => {
      if (err.response) {
        console.error(`Error response: ${err.response}`)
      } else if (err.request) {
        console.error(`Error request: ${err.request}`)
      } else {
        console.error(`Error message: ${err.message}`)
      }
    })
  }

  return (
    <div>
      <h2>Ballot Categories</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
      <div className='table-container'>
        <Table
        data={specData}
        updateRow={updateRow}
        fields={fields} />
      </div>
      )}
    </div>
  )
}

export default Category;
