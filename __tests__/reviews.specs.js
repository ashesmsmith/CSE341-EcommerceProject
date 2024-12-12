const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const mongoose = require('mongoose')

require('dotenv').config()
const { expect, describe, test, beforeAll, afterAll } = require('@jest/globals');

jest.mock('../utils/Oauth', () => ({
    checkAuth: (req, res, next) => next(),
    checkAdmin: (req, res, next) => next()
}))

beforeAll(async() =>{
    await mongoose.connect(process.env.MONGODB_URI)
})

afterAll(async() => {
    await mongoose.disconnect()
})

describe('Testing reviews', () => {
    test('GET /reviews/all', async() => {
        const res = await request.get('/reviews/all')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
   
    })

    test('GET /reviews/users/{userId}/reviews when user ID is correct', async() => {
        const res = await request.get('/reviews/users/6752c8b4fa5fd6cb5f8cc175/reviews')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
    })

    test('GET /reviews/{id} when ID is correct', async() => {
        const res = await request.get('/reviews/67581e548f0edf5246ca41a8')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
    })

    test('GET /reviews/{id} when reviews ID is incorrect', async() => {
        const res = await request.get('/reviews/123456789')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(400)
    })
})
