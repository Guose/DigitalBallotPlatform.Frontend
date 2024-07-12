const express = require('express')
const router = express.Router()
const userService = require('../services/platformUserServices')

router.get('/', async (req, res) => {
  try {
    const users = await userService.getUsers()
    res.json(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)
    res.json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newUser = await userService.postUser(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: 'Error creating user'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updateUser = await userService.updateUser(req.params.id, req.body)
    res.status(201).json(updateUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating user'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user'})
  }
})

module.exports = router
