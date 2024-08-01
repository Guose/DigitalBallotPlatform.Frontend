const express = require('express')
const router = express.Router()
const loginService = require('../services/loginServices')

router.post('/', async (req, res) => {
  try {
    const login = await loginService.authenticateUser(req.body)
    res.status(201).json(login)
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized user' })
  }
})

module.exports = router