// src/api/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001', // Express.js server URL
    withCredentials: true, // Send cookies with requests
})

export default axiosInstance
