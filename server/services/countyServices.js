const axios = require('axios')

const BASE_URL = 'http://localhost:5001/api/Stakeholder/County'

const getCounties = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching counties', error)
    throw error
  }
}

const getBallotSystemType = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/BallotSystemType`)
    console.log('response:', response.data)
    return response.data
  } catch (error) {
    console.error(`Error fetching Ballot System Type ${id}`, error)
    throw error
  }
}

const getVoterSystemType = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/VoterSystemType`)
    return response.data
  } catch (error) {
    console.error(`Error fetching Voter System Type ${id}`, error)
    throw error
  }
}

const getCountyById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching county with ID ${id}`, error)
    throw error
  }
}

const postCounty = async (countyData) => {
  try {
    const response = await axios.post(BASE_URL, countyData)
    return response.data
  } catch (error) {
    console.error(`Error creating county: `, error)
    throw error
  }
}

const updateCounty = async (id, countyData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, countyData)
    return response.data
  } catch (error) {
    console.error(`Error updating county: `, error)
    throw error
  }
}

const deleteCounty = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
  } catch (error) {
    console.error(`Error deleting county: `, error)
    throw error
  }
}

module.exports = {
  getBallotSystemType,
  getVoterSystemType,
  getCounties,
  getCountyById,
  postCounty,
  updateCounty,
  deleteCounty,
}