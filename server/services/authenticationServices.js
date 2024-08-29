const axios = require('axios')

const BASE_URL = 'http://localhost:5001/api/Auth'

const authenticateUser = async (loginCreds) => {
  console.log('Login User: ', loginCreds)
  try {
    const response = await axios.post(BASE_URL + '/AuthenticateUser', loginCreds)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Login failed', error)
    throw new Error('Login failed')
  }
} 

const renewToken = async (token) => {
  console.log('Renew Token: ', token)
  try {
    const response = await axios.post(BASE_URL + '/RenewToken', token)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Token Renewal failed', error)
    throw new Error('Token Renewal failed')
  }
}

module.exports = {
  authenticateUser,
  renewToken,
}