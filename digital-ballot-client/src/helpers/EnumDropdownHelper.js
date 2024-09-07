import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EnumDropdownHelper = ({ onChange, url, selectedValue }) => {
  const [loading, setLoading] = useState(true)
  const [enums, setEnums] = useState([])

  useEffect(() => {
    const fetchEnums = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setEnums(response.data)
      } catch (error) {
        console.error("There was an error fetching the ballot system types!", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEnums()
  }, [url])

  return(
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select onChange={e => onChange(e.target.value)} value={selectedValue}>
          <option value="">Select a Ballot System</option>
          {enums.map(e => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default EnumDropdownHelper