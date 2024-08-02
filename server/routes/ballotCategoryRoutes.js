const express = require('express')
const router = express.Router()
const ballotCategoryService = require('../services/ballotCategoryServices')

router.get('/', async (req, res) => {
  //const token2 = localStorage.getItem('token')
  //console.log('tokens from routes:', token2)
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log('token from routes:', token)
    const ballotCategories = await ballotCategoryService.getBallotCategories(token)
    res.json(ballotCategories)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const ballotCategory = await ballotCategoryService.getBallotCategoryById(req.params.id)
    res.json(ballotCategory)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newCategory = await ballotCategoryService.postBallotCategory(req.body)
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error creating category'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await ballotCategoryService.updateBallotCategory(req.params.id, req.body)
    res.status(201).json(updateCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error updating category'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await ballotCategoryService.deleteBallotCategory(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category'})
  }
})

module.exports = router
