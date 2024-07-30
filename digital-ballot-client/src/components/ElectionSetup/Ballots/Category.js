import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '../../../services/DataGrid/Table'
import './ballotStyle.css'

const BASE_URL = 'http://localhost:3001/BallotCategory'
const fields = [
    {name: 'category', label: 'Category', type: 'text'},
    {name: 'subCategory', label: 'SubCategory', type: 'text'},
    {name: 'laTestDeckType', label: 'LATestdeckType', type: 'text'},
    {name: 'description', label: 'Description', type: 'text'},
    {name: 'isTestdeck', label: 'Testdecks', type: 'checkbox'},
    {name: 'enabled', label: 'Enable', type: 'checkbox'},
]

const Category = () => {
  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL)
        setCategoryData(res.data)
      } catch (error) {
        console.error('Error fetching ballot categories', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const updateRow = async (updatedRow) => {
    setCategoryData(categoryData.map(row => row.id === updatedRow.id ? updateRow : row))
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
        data={categoryData}
        updateRow={updateRow}
        fields={fields} />
      </div>
      )}
    </div>
  )
}

export default Category;
