const axios = require('axios')
const jwt = require('jsonwebtoken')

const ASPNET_API_URL = process.env.ASPNET_API_URL || 'http://localhost:5001/api/Auth'
const JWT_SECRET = process.env.JWT_SECRET //|| 'L9G6Yu289NPZnjCsZ1xG5aD1Hi721kigdkCbycTHr1E='

const authenticateUser = async (loginCreds) => {
  console.log('Login User: ', loginCreds)
  
  try {
    const authenticateUserURL = `${ASPNET_API_URL}/AuthenticateUser`
    const response = await axios.post(authenticateUserURL, loginCreds)
    return await response.data

  } catch (error) {
    console.error('Login failed', error)
  }
} 

const renewToken = async (tokenRenewalData) => {
  console.log('Renew Token: ', tokenRenewalData)
  try {
    const response = await axios.post(`${ASPNET_API_URL}/RenewToken`, tokenRenewalData)
    console.log('response.data from express.js Auth service:', response.data);
    
    return await response.data.token
  } catch (error) {
    console.error('Token Renewal failed', error)
  }
}

const getUserFromToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] })    

    const userId = decoded.userId     

    if (!userId) return null

    const userResponse = await axios.get(`http://localhost:5001/api/Platform/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    
    return userResponse.data

  } catch (error) {
    console.error(error)
    return null
  }
}

module.exports = {
  authenticateUser,
  renewToken,
  getUserFromToken,
}