const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'L9G6Yu289NPZnjCsZ1xG5aD1Hi721kigdkCbycTHr1E='

const authenticationMiddleware = (req, res, next) => {
  const token = req.cookies.token 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token'})
    }
    req.user = decoded
    next()
  })
}

module.exports = authenticationMiddleware