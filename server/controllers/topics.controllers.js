const { fetchTopics,
        fetchApi,
        fetchArticleByID,
        fetchArticles,
        fetchCommentsByArticleID,
        insertComment,
        doesUserExist,
        doesArticleExist
        } = require('../models/topics.models')



exports.getTopics = (req, res, next) => {
    return fetchTopics()
    .then((topics) => {
        res.status(200).send( { topics } )
    })
    .catch(next)
}

exports.getApi = (req, res, next) => {
    return fetchApi()
    .then((api) => { 
        res.status(200).send( { api } )
    })
    .catch(next)
}

exports.getArticleByID = (req, res, next) => {
    const ID = req.params.article_id
    if (isNaN(ID)) {
        const error = new Error()
        error.status = 400
        return next(error)
    }
    return fetchArticleByID(ID)
    .then((article) => {
        if(article.length === 0) {
            res.status(404).send( { msg: '404: Not Found' } )
        } else {
            res.status(200).send( { article } )
        }
    })
    .catch(next)
}

exports.getArticles = (req, res, next) => {
    return fetchArticles()
    .then((articles) => {
        res.status(200).send( { articles } )
    })
    .catch(next)
}

exports.getCommentsByArticleID = (req, res, next) => {
    const ID = req.params.article_id
    if (isNaN(ID)) {
        const error = new Error()
        error.status = 400
        return next(error)
    }
    return fetchCommentsByArticleID(ID)
    .then((article) => {
        if(article.length === 0) {
            res.status(404).send( { msg: '404: Not Found' } )
        } else {
            res.status(200).send( { article } )
        }
    })
    .catch(next)
}

exports.postComment = (req, res, next) => {
    const article_id = req.params.article_id
    const newComment = req.body

    doesUserExist(newComment.username)
    .then((exists) => {
        if (!exists) {
            const error = new Error()
            error.status = 401
            return next(error)
        }
    })

    doesArticleExist(article_id)
    .then((exists) => {
        if (!exists) {
            const error = new Error()
            error.status = 404
            return next(error)
        }
    })

    insertComment(article_id, newComment)
    .then((comment) => {
        if (comment) {
            res.status(201).send( { comment } )
        } else { 
            res.status(401).send( { msg: '401: Unauthorized' } )
        }
    })
    .catch(next)
}