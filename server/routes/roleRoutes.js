const express = require('express')
const router = express.Router()
const roleService = require('../services/roleServices')

router.get('/', async (req, res) => {
  try {
    const roles = await roleService.getRoles()
    res.json(roles)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id)
    res.json(role)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newRole = await roleService.postRole(req.body)
    res.status(201).json(newRole)
  } catch (error) {
    res.status(500).json({ message: 'Error creating role'})
  }
})

module.exports = router
