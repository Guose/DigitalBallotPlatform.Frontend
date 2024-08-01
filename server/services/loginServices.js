const axios = require('axios')

const BASE_URL = 'http://localhost:5001/api/Auth/Login'

const authenticateUser = async (loginCreds) => {
  try {
    const response = await axios.post(BASE_URL, loginCreds)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Login failed', error)
    throw new Error('Login failed')
  }
} 

module.exports = {
  authenticateUser,
}