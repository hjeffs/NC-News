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

exports.fetchCommentsByArticleID = (ID) => {
    const commentsQuery = `SELECT *
                           FROM comments
                           WHERE article_id = $1
                           ORDER BY created_at DESC;`
    return db.query(commentsQuery, [ID])
    .then((comments) => {
        return comments.rows
    })
}

exports.insertComment = (article_id, newComment) => {
    const newCommentQuery = `
        INSERT INTO comments (author, body, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    return db.query(newCommentQuery, [newComment.username, newComment.body, article_id])
    .then((result) => {
        return result.rows[0]
        })

};

exports.doesUserExist = (username) => {
    const userExistsQuery = `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)`;
    return db.query(userExistsQuery, [username])
    .then((result) => {
        return result.rows[0].exists
    })
}

exports.doesArticleExist = (article_id) => {
    const articleExistsQuery = `SELECT EXISTS(SELECT 1 FROM articles WHERE article_id = $1)`
    return db.query(articleExistsQuery, [article_id])
    .then((result) => {
        return result.rows[0].exists
    })
}

exports.updateArticleByID = (article_id, votes) => {
    const updateArticleQuery = `UPDATE articles
                                SET votes = votes + $1
                                WHERE article_id = $2
                                RETURNING *;`
    return db.query(updateArticleQuery, [votes, article_id])
    .then((result) => {
        return result.rows[0]
    })
}

exports.removeComment = (comment_id) => {
    const removeCommentQuery = `DELETE FROM comments
                                WHERE comment_id = $1
                                RETURNING *`
    return db.query(removeCommentQuery, [comment_id])
    .then((result) => {
        return result.rows[0]
    })
}

exports.doesCommentExist = (comment_id) => {
    const commentExistsQuery = `SELECT EXISTS
                                (SELECT 1 FROM comments WHERE comment_id = $1)`
    return db.query(commentExistsQuery, [comment_id])
    .then((result) => {
        return result.rows[0].exists
    })
}

exports.fetchUsers = () => {
    const usersQuery = `SELECT * FROM users`
    return db.query(usersQuery)
    .then((users) => {
        return users.rows
    })
}