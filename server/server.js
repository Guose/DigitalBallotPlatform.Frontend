const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 3001

app.get('/weather', (req, res) => {
  axios('http://localhost:5001/weatherforecast')
  .then(response => {
    res.json(response.data)
    console.log('data: ', response.data)
  })
})

app.listen(PORT, () => {console.log('Server is running on PORT:', PORT)})