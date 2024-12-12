const server = require('../server');
const supertest = require('supertest');
const { expect, describe, test, beforeAll, afterAll } = require('@jest/globals');
const request = supertest(server);
const mongoose = require('mongoose');

jest.mock('../utils/Oauth', () => ({
    checkAuth: (req, res, next) => next(),
    checkAdmin: (req, res, next) => next()
}))

beforeAll(async() => {
    await mongoose.connect(process.env.MONGODB_URI)
});

afterAll(async() => {
    await mongoose.disconnect()
});

describe('Test Users', () => {
    test('GET /users', async () => {
        const res = await request.get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    });

    test('GET /users/{userId} for specific user', async () => {
        const res = await request.get('/users/6751341f7a01e019ffafb9db');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    });

    test('GET /users/{invalid userID} for an error', async () => {
        const res = await request.get('/users/1234567890abc');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Invalid UserId.');
    });

    test('GET /users/{invalid userID} for an error', async () => {
        const res = await request.get('/users/1a');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Invalid UserId.');
    });
});