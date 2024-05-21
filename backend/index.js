require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router')

// init app
const app = express()

// cors
app.use(cors())

// parse body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// port
const port = process.env.PORT || 3001

// init route
app.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Welcome',
    })
  } catch (error) {
    console.log('ERROR: ', error)
    res.sendStatus(500)
  }
})

const api = '/api/v1'
app.use(api, router)

// listen to port
app.listen(port, () => console.log('server listening on port: ', port))
