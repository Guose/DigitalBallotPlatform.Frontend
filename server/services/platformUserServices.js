const axios = require('axios')

const BASE_URL = 'http://localhost:5001/api/Platform/User'

const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching users', error)
    throw error
  }
}

const getUserById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching user with ID ${id}`, error)
    throw error
  }
}

const postUser = async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData)
    return response.data
  } catch (error) {
    console.error(`Error creating user: `, error)
    throw error
  }
}

const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, userData)
    return response.data
  } catch (error) {
    console.error(`Error updating user: `, error)
    throw error
  }
}

const deleteUser = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
  } catch (error) {
    console.error(`Error deleting user: `, error)
    throw error
  }
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
}