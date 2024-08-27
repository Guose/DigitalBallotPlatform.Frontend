import React, { useState, useEffect } from 'react'
import EnumDropdownHelper from '../../../helpers/EnumDropdownHelper'
import './countyStyle.css'

const BASE_URL = 'http://localhost:3001/County'

const County = () => {
  const [formData, setFormData] = useState({
    name: '',
    address1: '',
    address2: '',
    zipcode: '',
    state: '',
    city: '',
    ballotSystem: '',
    voterRegSystem: '',
  })

  // Key to use in localStorage
  const storageKey = 'formData'

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem(storageKey)
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
  }, [])

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(formData))
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleBallotSystemChange = (value) => {
    setFormData({
      ...formData,
      ballotSystem: value
    })
  }

  const handleVoterRegSystemChange = (value) => {
    setFormData({
      ...formData,
      voterRegSystem: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    localStorage.removeItem(storageKey)
  }

  return (
    <form className='county-form' onSubmit={handleSubmit}>
      <div>
        <input
          className='county-input'
          type="text"
          name="name"
          placeholder='Enter County Name'
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter Street Address'
          name="address1"
          value={formData.address1}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter Address Line 2'
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter Zipcode'
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter City'
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter State'
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ballot System: </label>
        <EnumDropdownHelper
          onChange={handleBallotSystemChange}
          url={BASE_URL + '/BallotSystemType'}
          selectedValue={formData.ballotSystem}
        />
      </div>
      <div>
        <label>Voter Registration System: </label>
        <EnumDropdownHelper
          onChange={handleVoterRegSystemChange}
          url={BASE_URL + '/VoterSystemType'}
          selectedValue={formData.voterRegSystem}
        />
      </div>
      <button className='county-btn' type="submit">Submit</button>
    </form>
  )
}

export default County


/*
  return (
    <form className='county-form' onSubmit={handleSubmit}>
      <div>
        <input
          className='county-input'
          type="text"
          name="name"
          placeholder='Enter County Name'
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter Street Address'
          name="address1"
          value={formData.address1}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter Address Line 2'
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter Zipcode'
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter City'
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className='county-input'
          type="text"
          placeholder='Enter State'
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ballot System Type:</label>
        <BallotSystemDropdown
          onChange={handleBallotSystemChange}
          baseURL="https://your-api-base-url.com/api/" // Set your base URL here
        />
      </div>
      <button className='county-btn' type="submit">Submit</button>
    </form>
  );
};

export default County;

*/