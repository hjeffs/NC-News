const express = require('express')
const app = express()

const { getTopics, getApi } = require('../server/controllers/topics.controllers')

const { handle404s } = require('./errors')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getApi)

app.use(handle404s)

module.exports = app