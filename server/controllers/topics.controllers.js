const { fetchTopics,
        fetchApi
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