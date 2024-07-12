const express = require('express')
const cors = require('cors')
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

// use middleware
app.use(cors())
app.use(express.json())

// Use routes
app.use('/api/Ballots/BallotCategory', BallotCategory)
app.use('/api/Ballots/BallotMaterial', BallotMaterial)
app.use('/api/Ballots/BallotSpec', BallotSpec)
app.use('/api/Stakeholder/Company', Company)
app.use('/api/Stakeholder/County', County)
app.use('/api/ElectionSetup/ElectionSetup', ElectionSetup)
app.use('/api/ElectionSetup/Party', Party)
app.use('/api/Platform/User', PlatformUser)
app.use('/api/Platform/Role', Role)
app.use('/api/Watermark/Watermark', Watermark)
app.use('/api/Watermark/WatermarkColor', WatermarkColor)

app.listen(PORT, () => {console.log('Server is running on PORT: {0}', PORT)})