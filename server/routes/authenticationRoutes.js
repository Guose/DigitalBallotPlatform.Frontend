const express = require('express')
const router = express.Router()
const authService = require('../services/authenticationServices')

router.post('/authenticateUser', async (req, res) => {
  try {
    const login = await authService.authenticateUser(req.body)
    res.status(201).json(login)
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized user! Contact tech support at 1-800-382-5968' })
  }
})

router.post('/renewToken', async (req, res) => {
  try {
    const renew = await authService.renewToken(req.body)
    res.status(201).json(renew)
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized token! Please login again to obtain new bearer token' })
  }
})

module.exports = router