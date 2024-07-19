import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001/BallotCategory'

const Category = () => {
  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState([])
  const [newCategoryData, setNewCategoryData] = useState({
    id: 0,
    category: 0,
    subCategory: 0,
    laTestDeckType: 0,
    description: '',
    isTestdeck: false,
    enabled: false,
    ballotSpecId: 0
  })

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

  const handleInputChange = (e, index) => {
    const {name, value, type, checked } = e.target
    const newData = [...categoryData]

    if (type === 'checkbox') {
      newData[index][name] = checked
    } else {
      newData[index][name] = value
    }

    setNewCategoryData(newData)
  }

  return (
    <div>
      <h2>Ballot Categories</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>subCategory</th>
            <th>Description</th>
            <th>Testdeck</th>
            <th>LA Rotation</th>
            <th>Enable</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type='text'
                  name='category'
                  value={row.category}
                  onChange={(e) => handleInputChange(e, index)}
                  />
              </td>
              <td>
                <input
                  type='text'
                  name='suCategory'
                  value={row.subCategory}
                  onChange={(e) => handleInputChange(e, index)}
                  />
              </td>
              <td>
                <input
                  type='text'
                  name='description'
                  value={row.description}
                  onChange={(e) => handleInputChange(e, index)}
                  />
              </td>
              <td>
                <input
                  type='checkbox'
                  name='isTestdeck'
                  value={newCategoryData.isTestdeck}
                  onChange={(e) => handleInputChange(e, index)}
                  />
              </td>
              <td>
                <input
                  type='text'
                  name='laType'
                  value={row.laTestDeckType}
                  onChange={(e) => handleInputChange(e, index)}
                  />
              </td>
              <td>
                <input
                  type='checkbox'
                  name='enabled'
                  value={newCategoryData.enabled}
                  onChange={(e) => handleInputChange(e, index)}
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  )
}

export default Category;
