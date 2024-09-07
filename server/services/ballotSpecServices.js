const axios = require('axios')

const BASE_URL = 'http://localhost:5001/api/Ballot/BallotSpec'

const getBallotSpecs = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching ballot specs', error)
    throw error
  }
}

const getBallotSpecById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching ballot spec with ID ${id}`, error)
    throw error
  }
}

const postBallotSpec = async (specData) => {
  try {
    const response = await axios.post(BASE_URL, specData)
    return response.data
  } catch (error) {
    console.error(`Error creating ballot spec: `, error)
    throw error
  }
}

const updateBallotSpec = async (id, specData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, specData)
    return response.data
  } catch (error) {
    console.error(`Error updating ballot spec: `, error)
    throw error
  }
}

const deleteBallotSpec = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
  } catch (error) {
    console.error(`Error deleting ballot spec: `, error)
    throw error
  }
}

module.exports = {
  getBallotSpecs,
  getBallotSpecById,
  postBallotSpec,
  updateBallotSpec,
  deleteBallotSpec,
}