const express = require('express')
const router = express.Router()
const ballotMaterialService = require('../services/ballotMaterialServices')

router.get('/', async (req, res) => {
  try {
    const ballotMaterials = await ballotMaterialService.getBallotMaterials()
    res.json(ballotMaterials)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const ballotMaterial = await ballotMaterialService.getBallotMaterialById(req.params.id)
    res.json(ballotMaterial)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newMaterial = await ballotMaterialService.postBallotMaterial(req.body)
    res.status(201).json(newMaterial)
  } catch (error) {
    res.status(500).json({ message: 'Error creating material'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateMaterial = await ballotMaterialService.updateBallotMaterial(req.params.id, req.body)
    res.status(201).json(updateMaterial)
  } catch (error) {
    res.status(500).json({ message: 'Error updating material'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await ballotMaterialService.deleteBallotMaterial(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting material'})
  }
})

module.exports = router
