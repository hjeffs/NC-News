const { fetchTopics,
        fetchApi,
        fetchArticleByID,
        fetchArticles
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