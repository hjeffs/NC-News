const express = require('express')
const app = express()

const { getTopics } = require('../server/controllers/topics.controllers')

const { handle404s } = require('./errors')

app.use(express.json())

app.get('/api/topics', getTopics)

app.use(handle404s)

module.exports = app