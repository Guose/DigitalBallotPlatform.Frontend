const express = require('express')
const router = express.Router()
const countyService = require('../services/countyServices')

router.get('/', async (req, res) => {
  try {
    const counties = await countyService.getCounties()
    res.json(counties)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/BallotSystemType', async (req, res) => {
  try {
    const ballotSystemType = await countyService.getBallotSystemType()
    res.json(ballotSystemType)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/VoterSystemType', async (req, res) => {
  try {
    const voterSystemType = await countyService.getVoterSystemType()
    res.json(voterSystemType)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const county = await countyService.getCountyById(req.params.id)
    res.json(county)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newCounty = await countyService.postCounty(req.body)
    res.status(201).json(newCounty)
  } catch (error) {
    res.status(500).json({ message: 'Error creating county'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateCounty = await countyService.updateCounty(req.params.id, req.body)
    res.status(201).json(updateCounty)
  } catch (error) {
    res.status(500).json({ message: 'Error updating county'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await countyService.deleteCounty(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting county'})
  }
})

module.exports = router
