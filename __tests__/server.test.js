const request = require('supertest')
const app = require('../server/app')
const db = require('../db/connection')
const data = require('../db/data/test-data')
const seed = require('../db/seeds/seed')

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