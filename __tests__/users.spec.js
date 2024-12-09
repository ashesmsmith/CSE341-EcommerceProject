const server = require('../server');
const supertest = require('supertest');
const { expect, describe } = require('@jest/globals');
const request = supertest(server);

describe('Test Users', () => {
    test('responds to /users', async () => {
        const res = await request.get('/users');
        expect(res.statusCode).toBe(200);
    });
});