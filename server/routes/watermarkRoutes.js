const express = require('express')
const router = express.Router()
const watermarkService = require('../services/watermarkServices')

router.get('/', async (req, res) => {
  try {
    const watermarks = await watermarkService.getWatermarks()
    res.json(watermarks)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const watermark = await watermarkService.getWatermarkById(req.params.id)
    res.json(watermark)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newWatermark = await watermarkService.postWatermark(req.body)
    res.status(201).json(newWatermark)
  } catch (error) {
    res.status(500).json({ message: 'Error creating watermark'})
  }
})

module.exports = router
