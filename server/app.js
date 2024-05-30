const express = require('express')
const app = express()

const { getTopics,
        getApi,
        getArticleByID,
        getArticles,
        getCommentsByArticleID,
        postComment,
        patchArticle,
        deleteComment
        } = require('../server/controllers/topics.controllers')

const { handle400s, handle401s, handle404s, handle500s } = require('./errors')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getApi)

app.get('/api/articles/:article_id', getArticleByID)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleID)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteComment)

app.all('*', (req, res, next) => { 
    const err = new Error('404: Not Found')
    err.status = 404
    next(err)
});

app.use(handle404s)
app.use(handle401s)
app.use(handle400s)
app.use(handle500s)

module.exports = app