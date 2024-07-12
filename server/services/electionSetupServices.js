const axios = require('axios')

const BASE_URL = 'https://localhost:7300/api/ElectionSetup/ElectionSetup'

const getElectionSetups = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching election setups', error)
    throw error
  }
}

const getElectionSetupById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching election setup with ID ${id}`, error)
    throw error
  }
}

const postElectionSetup = async (electionData) => {
  try {
    const response = await axios.post(BASE_URL, electionData)
    return response.data
  } catch (error) {
    console.error(`Error creating election setup: `, error)
    throw error
  }
}

const updateElectionSetup = async (id, electionData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, electionData)
    return response.data
  } catch (error) {
    console.error(`Error updating election setup: `, error)
    throw error
  }
}

const deleteElectionSetup = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
  } catch (error) {
    console.error(`Error deleting election setup: `, error)
    throw error
  }
}

module.exports = {
  getElectionSetups,
  getElectionSetupById,
  postElectionSetup,
  updateElectionSetup,
  deleteElectionSetup,
}