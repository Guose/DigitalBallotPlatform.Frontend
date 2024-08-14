import React, { useState, useEffect } from 'react'
import './countyStyle.css'

const County = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    localStorage.removeItem(storageKey)
  }

  return (
    <form className='county-form' onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            className='county-input'
            type="text"
            name="name"
            placeholder='Enter County Name'
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            className='county-input'
            type="text"
            placeholder='Enter Email'
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>
      </div>
      <button className='county-btn' type="submit">Submit</button>
    </form>
  );
};

export default County;
