const request = require('supertest')
const app = require('../server/app')
const db = require('../db/connection')
const data = require('../db/data/test-data')
const seed = require('../db/seeds/seed')
const fs = require('fs/promises')
const { get } = require('http')

beforeEach(() => {
    return seed(data);
  });

afterAll(() => {
    return db.end();
  });

describe('GET /api/topics', () => {
    test('200: responds with array of topic objects with slug and description properties', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(( { body } ) => {
            const topics = body.topics
            expect(Array.isArray(topics)).toBe(true)
            expect(topics.length).toBe(3)
            topics.forEach((topic) => {
                expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            })
        })
    })
    test('404: responds with error message when invalid path', () => {
        return request(app)
        .get('/api/invalidtopic')
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
})

describe('GET /api', () => {
    test('200: responds with JSON object describing all the available endpoints on the API', () => {
        return fs.readFile('endpoints.json', 'utf8')
        .then((data) => {
            return request(app)
            .get('/api')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(( { body } ) => {
                expect(body.api).toEqual(JSON.parse(data))
            })
        })
    })
})

describe('GET /api/articles/:article_id', () => { 
    test('200: responds with article object w/ correct properties', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(( { body } ) => {
            expect(body.article[0]).toEqual({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 100,
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                comment_count: "11"
            })
        })
    })
    test('404: responds with error message when ID > max ID', () => {
        return request(app)
        .get('/api/articles/99999999')
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
    test('400: responds with error message when ID is invalid type', () => {
        return request(app)
        .get('/api/articles/typeerror')
        .expect(400)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('400: Bad Request')
        })
    })
})

describe('GET /api/articles', () => {
    test('200: responds with articles array of article objects w/ correct properties', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(( { body } ) => {
            const articles = body.articles
            expect(Array.isArray(articles)).toBe(true)
            expect(articles.length).toBe(13)
            articles.forEach((article) => {
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(String)
                })
            })
        })
    })
    test('404: responds with error message when URL is invalid', () => {
        return request(app)
        .get('/api/5')
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
})

describe('GET /api/articles/:article_id/comments', () => {
    test('200: responds with an array of comments for given article_id', () => {
        return request(app)
        .get('/api/articles/3/comments')
        .expect(200)
        .then(( { body } ) => {
            const comments = body.article
            expect(Array.isArray(comments)).toBe(true)
            expect(comments.length).toBe(2)
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                        body: expect.any(String),
                        votes: expect.any(Number),
                        author: expect.any(String),
                        article_id: expect.any(Number),
                        created_at: expect.any(String),
                        comment_id: expect.any(Number)
                })
            })
        })
    })
    test('404: responds with error message when ID > max ID', () => {
        return request(app)
        .get('/api/articles/99999999/comments')
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
    test('400: responds with error message when ID is invalid type', () => {
        return request(app)
        .get('/api/articles/NaN/comments')
        .expect(400)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('400: Bad Request')
        })
    })
})

describe('POST /api/articles/:article_id/comments', () => {
    test('201: given valid object, creates new comment', () => {
        const postComment = {
            username: "icellusedkars",
            body: "blah blah"
        }
        return request(app)
        .post('/api/articles/2/comments')
        .send(postComment)
        .expect(201)
        .then(( { body } ) => {
            expect(body.comment).toMatchObject({
                author: "icellusedkars",
                body: "blah blah"
            })
        })
    })
    test('401: responds with error when given invalid object (user does not exist)', () => {
        const postComment = {
            username: "testingThisFeature",
            body: "blah blah blah"
        }
        return request(app)
        .post('/api/articles/2/comments')
        .send(postComment)
        .expect(401)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('401: Unauthorized')
        })
    })
    test('404: responds with error when given valid object and article_id does not exist', () => {
        const postComment = {
            username: "icellusedkars",
            body: "blah blah"
        }
        return request(app)
        .post('/api/articles/999999/comments')
        .send(postComment)
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
})
describe('PATCH /api/articles/:article_id', () => {
    test('200: responds with updated article', () => {
        const updateVotes = { inc_votes: 1 }
        return request(app)
        .patch('/api/articles/1')
        .send(updateVotes)
        .expect(200)
        .then(( { body } ) => {
            expect(body.article).toEqual({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 101,
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            })
        })
    })
    test('400: errors when given a invalid type article_id', () => {
        const updateVotes = { inc_votes: 1 }
        return request(app)
        .patch('/api/articles/1st')
        .send(updateVotes)
        .expect(400)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('400: Bad Request')
        })
    })
    test('404: errors when article does not exist', () => {
        const updateVotes = { inc_votes: 1 }
        return request(app)
        .patch('/api/articles/10000')
        .send(updateVotes)
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
})
describe('DELETE /api/comments/:comment_id', () => {
    test('204: deletes given comment by comment_id', () => {
        return request(app)
        .delete('/api/comments/1')
        .expect(204)
        .then(( { body } ) => {
            expect(body).toEqual({})
        })
    })
    test('400: errors when given a invalid type comment_id', () => {
        return request(app)
        .delete('/api/comments/1st')
        .expect(400)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('400: Bad Request')
        })
    })
    test('404: errors when comment does not exist', () => {
        return request(app)
        .delete('/api/comments/10000')
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
})
describe('GET /api/users', () => { 
    test('200: responds with an array of user objects with correct properties', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(( { body } ) => {
            const users = body.users
            expect(Array.isArray(users)).toBe(true)
            expect(users.length).toBe(4)
            users.forEach((user) => {
                expect(user).toMatchObject({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
                })
            })
        })
    })
    test('404: responds with error message when URL is invalid', () => {
        return request(app)
        .get('/api/5')
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
})
describe('GET /api/articles?topic', () => {
    test('200: responds with array of articles with matching topic', () => {
        return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(( { body } ) => {
            const catArticles = body.articles
            expect(Array.isArray(catArticles)).toBe(true)
            expect(catArticles.length).toBe(1)
            catArticles.forEach((catArticle) => {
                expect(catArticle).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                })
            })
        })
    })
    test('404: responds with an error when the topic does not exist', () => {
        return request(app)
        .get('/api/articles?topic=spaghetti')
        .expect(404)
        .then(( { body } ) => {
            const errorMsg = body.msg
            expect(errorMsg).toBe('404: Not Found')
        })
    })
})