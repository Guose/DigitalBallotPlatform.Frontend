const express = require('express')
const router = express.Router()
const ballotSpecService = require('../services/ballotSpecServices')

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const ballotSpecs = await ballotSpecService.getBallotSpecs(token)
    res.json(ballotSpecs)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const ballotMaterial = await ballotSpecService.getBallotSpecById(req.params.id)
    res.json(ballotMaterial)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newMaterial = await ballotSpecService.postBallotSpec(req.body)
    res.status(201).json(newMaterial)
  } catch (error) {
    res.status(500).json({ message: 'Error creating spec'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateSpec = await ballotSpecService.updateBallotSpec(req.params.id, req.body)
    res.status(201).json(updateSpec)
  } catch (error) {
    res.status(500).json({ message: 'Error updating spec'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await ballotSpecService.deleteBallotSpec(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting spec'})
  }
})

module.exports = router
