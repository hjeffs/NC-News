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

exports.fetchArticles = () => {
    const articlesWithCommentCountQuery = `SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url, COUNT(c.comment_id) AS comment_count
                                        FROM articles a
                                        LEFT JOIN comments c
                                        ON a.article_id = c.article_id
                                        GROUP BY a.article_id
                                        ORDER BY created_at DESC;`

    return db.query(articlesWithCommentCountQuery)
    .then((articlesResults) => {
        const articles = articlesResults.rows
        return articles
    })
}