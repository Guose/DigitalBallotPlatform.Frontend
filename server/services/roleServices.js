const axios = require('axios')

const BASE_URL = 'https://localhost:7300/api/Platform/Role'

const getRoles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching users', error)
    throw error
  }
}

const getRoleById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching user with ID ${id}`, error)
    throw error
  }
}

const postRole = async (roleData) => {
  try {
    const response = await axios.post(BASE_URL, roleData)
    return response.data
  } catch (error) {
    console.error(`Error creating user: `, error)
    throw error
  }
}

module.exports = {
  getRoles,
  getRoleById,
  postRole,
}