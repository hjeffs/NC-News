const db = require('../../db/connection')
const topics = require('../../db/data/test-data/topics')

const fs = require('fs/promises')

exports.fetchTopics = () => {
    let SQLQuery = 'SELECT * FROM topics;'
    return db.query(SQLQuery)
    .then((topics) => {
        return topics.rows
    })
}

exports.fetchApi = () => {
    const filePath = 'endpoints.json'
    return fs.readFile(filePath, 'utf-8')
    .then((data) => {
        const JSONdata = JSON.parse(data)
        return JSONdata
    })
}

exports.fetchArticleByID = (ID) => {
    let SQLQuery = 'SELECT * FROM articles WHERE article_id = $1;'
    return db.query(SQLQuery, [ID])
    .then((article) => {
        return article.rows
    })
}