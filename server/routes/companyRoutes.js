const express = require('express')
const router = express.Router()
const companyService = require('../services/companyServices')

router.get('/', async (req, res) => {
  try {
    const companies = await companyService.getCompanies()
    res.json(companies)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id)
    res.json(company)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newCompany = await companyService.postCompany(req.body)
    res.status(201).json(newCompany)
  } catch (error) {
    res.status(500).json({ message: 'Error creating company'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateCompany = await companyService.updateCompany(req.params.id, req.body)
    res.status(201).json(updateCompany)
  } catch (error) {
    res.status(500).json({ message: 'Error updating company'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await companyService.deleteCompany(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company'})
  }
})

module.exports = router
