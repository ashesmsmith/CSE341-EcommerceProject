const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const mongoose = require('mongoose')
const Order = require('../models/orderModel')
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

describe('Test Orders', () => {
    test('GET /orders/all', async() => {
        const res = await request.get('/orders/all')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body.data)).toBe(true);
    })

    test('GET /orders/user/{userId} when user ID is correct', async() => {
        const res = await request.get('/orders/user/63e2f8c9a4f0b5c6e5234571')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
    })

    test('GET /orders/{id} when order ID is correct', async() => {
        const res = await request.get('/orders/675330aed52abb5da4a7e470')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
    })

    test('GET /orders/{id} when order ID is incorrect', async() => {
        const res = await request.get('/orders/6756')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(400)
    })
})
