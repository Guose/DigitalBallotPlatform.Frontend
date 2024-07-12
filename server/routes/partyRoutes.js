const express = require('express')
const router = express.Router()
const partyService = require('../services/partyServices')

router.get('/', async (req, res) => {
  try {
    const parties = await partyService.getParties()
    res.json(parties)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const party = await partyService.getPartyById(req.params.id)
    res.json(party)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newParty = await partyService.postParty(req.body)
    res.status(201).json(newParty)
  } catch (error) {
    res.status(500).json({ message: 'Error creating party'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateParty = await partyService.updateParty(req.params.id, req.body)
    res.status(201).json(updateParty)
  } catch (error) {
    res.status(500).json({ message: 'Error updating party'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await partyService.deleteParty(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting party'})
  }
})

module.exports = router
