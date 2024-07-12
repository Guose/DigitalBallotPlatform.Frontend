const axios = require('axios')

const BASE_URL = 'https://localhost:7300/api/ElectionSetup/Party'

const getParties = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching companies', error)
    throw error
  }
}

const getPartyById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching party with ID ${id}`, error)
    throw error
  }
}

const postParty = async (partyData) => {
  try {
    const response = await axios.post(BASE_URL, partyData)
    return response.data
  } catch (error) {
    console.error(`Error creating party: `, error)
    throw error
  }
}

const updateParty = async (id, partyData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, partyData)
    return response.data
  } catch (error) {
    console.error(`Error updating party: `, error)
    throw error
  }
}

const deleteParty = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
  } catch (error) {
    console.error(`Error deleting party: `, error)
    throw error
  }
}

module.exports = {
  getParties,
  getPartyById,
  postParty,
  updateParty,
  deleteParty,
}