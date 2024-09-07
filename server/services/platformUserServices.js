const axios = require('axios')

const BASE_URL = 'http://localhost:5001/api/Platform/User'

const getUsers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
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

const postUser = async (userData, token) => {
  try {
    const response = await axios.post(BASE_URL, userData, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data
  } catch (error) {
    console.error(`Error creating user: `, error)
    throw error
  }
}

const updateUser = async (id, userData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, userData, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response.data
  } catch (error) {
    console.error(`Error updating user: `, error)
    throw error
  }
}

const deleteUser = async (id, token) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
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