const db = require('../../db/connection')
const topics = require('../../db/data/test-data/topics')

exports.fetchTopics = () => {
    let SQLQuery = 'SELECT * FROM topics;'
    return db.query(SQLQuery)
    .then((topics) => {
        return topics.rows
    })
}