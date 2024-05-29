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
    let articlesQuery = `SELECT author, title, article_id, topic, created_at, votes, article_img_url
                         FROM articles
                         ORDER BY created_at DESC;`

    const commentCountQuery = `SELECT COUNT(*) AS comment_count 
                                FROM comments
                                GROUP BY article_id;`
                                
    return db.query(articlesQuery)
    .then((articlesResults) => {
        const articles = articlesResults.rows

        return db.query(commentCountQuery)
        .then((commentsResults) => {
            const commentCounts = commentsResults.rows
           
            const commentCountMap = {}

            commentCounts.forEach(count => {
            commentCountMap[count.article_id] = count.comment_count
            })

            articles.forEach(article => {
            article.comment_count = commentCountMap[article.article_id] || 0
            })

            return articles
        })
    })
}