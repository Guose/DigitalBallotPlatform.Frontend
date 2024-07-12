const axios = require('axios')

const BASE_URL = 'https://localhost:7300/api/Stakeholder/Company'

const getCompanies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    console.error('Error fetching companies', error)
    throw error
  }
}

const getCompanyById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching company with ID ${id}`, error)
    throw error
  }
}

const postCompany = async (companyData) => {
  try {
    const response = await axios.post(BASE_URL, companyData)
    return response.data
  } catch (error) {
    console.error(`Error creating company: `, error)
    throw error
  }
}

const updateCompany = async (id, companyData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, companyData)
    return response.data
  } catch (error) {
    console.error(`Error updating company: `, error)
    throw error
  }
}

const deleteCompany = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
  } catch (error) {
    console.error(`Error deleting company: `, error)
    throw error
  }
}

module.exports = {
  getCompanies,
  getCompanyById,
  postCompany,
  updateCompany,
  deleteCompany,
}