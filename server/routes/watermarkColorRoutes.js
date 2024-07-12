const express = require('express')
const router = express.Router()
const watermarkColorService = require('../services/watermarkColorServices')

router.get('/', async (req, res) => {
  try {
    const watermarkColors = await watermarkColorService.getWatermarkColors()
    res.json(watermarkColors)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const watermarkColor = await watermarkColorService.getWatermarkColorById(req.params.id)
    res.json(watermarkColor)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newWatermarkColor = await watermarkColorService.postWatermarkColor(req.body)
    res.status(201).json(newWatermarkColor)
  } catch (error) {
    res.status(500).json({ message: 'Error creating watermark color'})
  }
})

module.exports = router
