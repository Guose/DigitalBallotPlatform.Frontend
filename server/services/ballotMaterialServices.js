const axios = require('axios')

const BASE_URL = 'https://localhost:7300/api/Ballot/BallotMaterial'

const getBallotMaterials = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching ballot materials', error)
    throw error
  }
}

const getBallotMaterialById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching ballot material with ID ${id}`, error)
    throw error
  }
}

const postBallotMaterial = async (materialData) => {
  try {
    const response = await axios.post(BASE_URL, materialData)
    return response.data
  } catch (error) {
    console.error(`Error creating ballot material: `, error)
    throw error
  }
}

const updateBallotMaterial = async (id, materialData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, materialData)
    return response.data
  } catch (error) {
    console.error(`Error updating ballot material: `, error)
    throw error
  }
}

const deleteBallotMaterial = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
  } catch (error) {
    console.error(`Error deleting ballot material: `, error)
    throw error
  }
}

module.exports = {
  getBallotMaterials,
  getBallotMaterialById,
  postBallotMaterial,
  updateBallotMaterial,
  deleteBallotMaterial,
}