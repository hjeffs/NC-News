const express = require('express')
const app = express()

const { getTopics,
         getApi,
         getArticleByID } = require('../server/controllers/topics.controllers')

const { handle404s, handle400s, handle500s } = require('./errors')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getApi)

app.get('/api/articles/:article_id', getArticleByID)

app.use(handle404s)
app.use(handle400s)
app.use(handle500s)

module.exports = app