const express = require('express')
const router = express.Router()
const authService = require('../services/authenticationServices')

// POST /Auth/authenticateUser
router.post('/authenticateUser', async (req, res) => {
    try {
        const { username, password, authInterval, rememberMe } = req.body
        const login = await authService.authenticateUser({ username, password, authInterval, rememberMe })

        console.log('login response:', login)        
        
        // Extract token and user data
        const Token = login.token
        const User = login.user
        
        // Set token as HttpOnly cookie
        res.cookie('token', Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true in production
            sameSite: 'Strict', // or 'Lax' based on your needs
            maxAge: rememberMe ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 24, // 30 days or 1 day
        })
        
        // Respond with user data
        res.status(200).json({ user: User, token: Token })

    } catch (error) {
        console.error('Authentication failed:', error.message)
        res.status(401).json({ message: 'Unauthorized user! Contact tech support at 1-800-382-5968' })
    }
})

// POST /Auth/renewToken
router.post('/renewToken', async (req, res) => {
    try {
        console.log('req.cookies:', req.cookies)
        const token = req.cookies.token // Read token from HttpOnly cookie (token only)
        
        if (!token || token === 'undefined') {
            return res.status(401).json(
                { 
                    message: 'No cookie with token provided',
                }
            )
        }

        const renewToken = await authService.renewToken(
            { 
                Token: token, 
                AuthInterval: 1 
            }
        ) // Adjust authInterval as needed
        console.log('renewed token from backend:', renewToken)        
        
        // Set new token as HttpOnly cookie
        res.cookie('token', renewToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        })
        
        res.status(200).json({ token: renewToken })
    } catch (error) {
        console.error('Token renewal failed:', error.message)
        res.status(401).json({ message: 'Unauthorized token! Please login again to obtain new bearer token' })
    }
})

// GET /Auth/me
router.get('/me', async (req, res) => {
    try {
        const token = req.cookies.authToken
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' })
        }

        const user = await authService.getUserFromToken(token)
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        res.status(200).json({ user })
    } catch (error) {
        console.error('Failed to get user:', error)
        res.status(401).json({ message: 'Unauthorized' })
    }
})

// POST /Auth/logout
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    })
    res.status(200).json({ message: 'Logged out successfully' })
})

module.exports = router
