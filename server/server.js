require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = process.env.PORT || 3001

// Import routes
const BallotCategory = require('./routes/ballotCategoryRoutes')
const BallotMaterial = require('./routes/ballotMaterialRoutes')
const BallotSpec = require('./routes/ballotSpecRoutes')
const Company = require('./routes/companyRoutes')
const County = require('./routes/countyRoutes')
const ElectionSetup = require('./routes/electionSetupRoutes')
const Party = require('./routes/partyRoutes')
const PlatformUser = require('./routes/platformUserRoutes')
const Role = require('./routes/roleRoutes')
const Watermark = require('./routes/watermarkRoutes')
const WatermarkColor = require('./routes/watermarkColorRoutes')
const Auth = require('./routes/authenticationRoutes')

// use middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Use routes
app.use('/BallotCategory', BallotCategory)
app.use('/BallotMaterial', BallotMaterial)
app.use('/BallotSpec', BallotSpec)
app.use('/Company', Company)
app.use('/County', County)
app.use('/ElectionSetup', ElectionSetup)
app.use('/Party', Party)
app.use('/User', PlatformUser)
app.use('/Role', Role)
app.use('/Watermark', Watermark)
app.use('/WatermarkColor', WatermarkColor)
app.use('/Auth', Auth)

app.listen(PORT, () => {console.log('Server is running on PORT:', PORT)})