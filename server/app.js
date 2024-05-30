const express = require('express')
const app = express()

const { getTopics,
        getApi,
        getArticleByID,
        getArticles,
        getCommentsByArticleID,
        postComment
        } = require('../server/controllers/topics.controllers')

const { handle400s, handle401s, handle404s, handle500s } = require('./errors')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getApi)

app.get('/api/articles/:article_id', getArticleByID)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleID)

app.post('/api/articles/:article_id/comments', postComment)

app.use(handle404s)
app.use(handle401s)
app.use(handle400s)
app.use(handle500s)

module.exports = app