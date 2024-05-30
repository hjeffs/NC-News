const { fetchTopics,
        fetchApi,
        fetchArticleByID,
        fetchArticles,
        fetchCommentsByArticleID,
        insertComment,
        doesUserExist,
        doesArticleExist,
        updateArticleByID,
        removeComment,
        doesCommentExist,
        fetchUsers,
        doesTopicExist
        } = require('../models/models')



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
    const { topic } = req.query
    
    if ( topic !== undefined) {
        doesTopicExist( { topic } )
        .then((exists) => {
            if (!exists) {
                const error = new Error()
                error.status = 404
                return next(error)
            }
        })
    }


    return fetchArticles(topic)
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

exports.patchArticle = (req, res, next) => {
    const ID = req.params.article_id
    const votes = req.body.inc_votes
    
    if (isNaN(ID)) {
        const error = new Error()
        error.status = 400
        return next(error)
    }

    doesArticleExist(ID)
    .then((exists) => {
        if (!exists) {
            const error = new Error()
            error.status = 404
            return next(error)
        }
    })

    return updateArticleByID(ID, votes)
    .then((article) => {
        if(article.length === 0) {
            res.status(404).send( { msg: '404: Not Found' } )
        } else {
            res.status(200).send( { article } )
        }
    })
    .catch(next)
}

exports.deleteComment = (req, res, next) => {
    const comment_id = req.params.comment_id

    if (isNaN(comment_id)) {
        const error = new Error()
        error.status = 400
        return next(error)
    }

    doesCommentExist(comment_id)
    .then((exists) => {
        if (!exists) {
            const error = new Error()
            error.status = 404
            return next(error)
        } else {
            return removeComment(comment_id)
            .then((result) => {
                res.status(204).send( { result } )
            })
        }
    })
}

exports.getUsers = (req, res, next) => {
    return fetchUsers()
    .then((users) => {
        res.status(200).send( { users} )
    })
}
