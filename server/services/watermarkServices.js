const axios = require('axios')

const BASE_URL = 'https://localhost:7300/api/Watermark/Watermark'

const getWatermarks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching watermarks', error)
    throw error
  }
}

const getWatermarkById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching watermark with ID ${id}`, error)
    throw error
  }
}

const postWatermark = async (watermarkData) => {
  try {
    const response = await axios.post(BASE_URL, watermarkData)
    return response.data
  } catch (error) {
    console.error(`Error creating watermark: `, error)
    throw error
  }
}

module.exports = {
  getWatermarks,
  getWatermarkById,
  postWatermark,
}