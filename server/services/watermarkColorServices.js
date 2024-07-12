const axios = require('axios')

const BASE_URL = 'https://localhost:7300/api/Watermark/WatermarkColor'

const getWatermarkColors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching watermarks', error)
    throw error
  }
}

const getWatermarkColorById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching watermark with ID ${id}`, error)
    throw error
  }
}

const postWatermarkColor = async (watermarkData) => {
  try {
    const response = await axios.post(BASE_URL, watermarkData)
    return response.data
  } catch (error) {
    console.error(`Error creating watermark: `, error)
    throw error
  }
}

module.exports = {
  getWatermarkColors,
  getWatermarkColorById,
  postWatermarkColor,
}