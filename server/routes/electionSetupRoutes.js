const express = require('express')
const router = express.Router()
const electionSetupService = require('../services/electionSetupServices')

router.get('/', async (req, res) => {
  try {
    const electionSetups = await electionSetupService.getElectionSetups()
    res.json(electionSetups)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const electionSetup = await electionSetupService.getElectionSetupById(req.params.id)
    res.json(electionSetup)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newElectionSetup = await electionSetupService.postElectionSetup(req.body)
    res.status(201).json(newElectionSetup)
  } catch (error) {
    res.status(500).json({ message: 'Error creating county'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateElectionSetup = await electionSetupService.updateElectionSetup(req.params.id, req.body)
    res.status(201).json(updateElectionSetup)
  } catch (error) {
    res.status(500).json({ message: 'Error updating county'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await electionSetupService.deleteElectionSetup(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting county'})
  }
})

module.exports = router
