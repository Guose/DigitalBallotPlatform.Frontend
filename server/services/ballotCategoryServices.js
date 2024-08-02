const axios = require('axios')

const BASE_URL = 'http://localhost:5001/api/Ballot/BallotCategory'

const getBallotCategories = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching ballot categories', error)
    throw error
  }
}

const getBallotCategoryById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching ballot with ID ${id}`, error)
    throw error
  }
}

const postBallotCategory = async (categoryData, token) => {
  try {
    const response = await axios.post(BASE_URL, categoryData, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data
  } catch (error) {
    console.error(`Error creating ballot: `, error)
    throw error
  }
}

const updateBallotCategory = async (id, categoryData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, categoryData, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data
  } catch (error) {
    console.error(`Error updating ballot: `, error)
    throw error
  }
}

const deleteBallotCategory = async (id, token) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
  } catch (error) {
    console.error(`Error deleting ballot: `, error)
    throw error
  }
}

module.exports = {
  getBallotCategories,
  getBallotCategoryById,
  postBallotCategory,
  updateBallotCategory,
  deleteBallotCategory,
}