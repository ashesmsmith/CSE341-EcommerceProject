const server = require('../server');
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose');
const { expect, describe, test, beforeAll, afterAll } = require('@jest/globals');

jest.mock('../utils/Oauth', () => ({
    checkAuth: (req, res, next) => next(),
    checkAdmin: (req, res, next) => next()
}));

beforeAll(async() =>{
    await mongoose.connect(process.env.MONGODB_URI)
});

afterAll(async() => {
    await mongoose.disconnect()
});

describe('Products routes tests', () => {
    test('GET /products', async() => {
        const res = await request.get('/products')
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body.data)).toBe(true);
    });
    test('GET /products/{_id} for a valid ID', async() => {
        const res = await request.get('/products/6756325850d9e00748f7d24b');
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
    });
    test('GET /products/{_id} for a invalid ID', async() => {
        const res = await request.get('/products/67563258d9e00748f7d24b');
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(400);
    });
    test('POST /products creates a new product', async () => {
        const productData = {
            productId: 26,
            name: "Smart Thermostat",
            category: "Electronics",
            price: 199.99,
            stock: 40,
            description: "Energy-efficient smart thermostat compatible with voice assistants.",
            imageUrl: "https://example.com/images/smart-thermostat.jpg"
        };
        const res = await request.post('/products').send(productData);
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.success).toBe(true);
        expect(res.body.data).toMatchObject({
            productId: 26,
            name: "Smart Thermostat",
            category: "Electronics",
            price: 199.99,
            stock: 40,
            description: "Energy-efficient smart thermostat compatible with voice assistants.",
            imageUrl: "https://example.com/images/smart-thermostat.jpg"
        });
    });
    test('PUT /products/:id updates an existing product', async () => {
        const productId = '6751cbc96aac217c1f5aa780';
        const updatedData = {
            productId: 19,
            name: "Water Bottle",
            category: "Outdoor",
            price: 24.99,
            stock: 500,
            description: "Stainless steel insulated water bottle.",
            imageUrl: "https://example.com/images/water-bottle.jpg"
        };
        const res = await request.put(`/products/${productId}`).send(updatedData);
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.success).toBe(true);
        expect(res.body.data).toMatchObject(updatedData);
    });
    test('PUT /products/:id returns 400 for invalid ID format', async () => {
        const invalidId = '6751cbc96c217c1f5aa780';
        const updatedData = {
            productId: 19,
            name: "Water Bottle",
            category: "Outdoor",
            price: 24.99,
            stock: 500,
            description: "Stainless steel insulated water bottle.",
            imageUrl: "https://example.com/images/water-bottle.jpg"
        };
        const res = await request.put(`/products/${invalidId}`).send(updatedData);
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body).toBeDefined();
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid ID format');
    });
    test('PUT /products/:id returns 404 for non-existing product', async () => {
        const nonExistingId = '6751cbc96aac217c1f5aa789';
        const updatedData = {
            productId: 12,
            name: "Ergonomic Office Chair",
            category: "Furniture",
            price: 249.99,
            stock: 60,
            description: "Supportive and comfortable chair for long work hours.",
            imageUrl: "https://example.com/images/office-chair.jpg"
        };
        const res = await request.put(`/products/${nonExistingId}`).send(updatedData);
        expect(res.header['content-type']).toMatch('application/json');
        expect(res.statusCode).toBe(404);
        expect(res.body).toBeDefined();
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Product not found or could not be updated');
    });
    // test('DELETE /products/:id for a valid ID', async () => {
    //     const validId = '675aef110b4739db520a5bd9';
    //     const res = await request.delete(`/products/${validId}`);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.success).toBe(true);
    //     expect(res.body.message).toMatch('Product deleted successfully');
    //   });
      
    //   test('DELETE /products/:id for an invalid ID format', async () => {
    //     const invalidId = '675aef110b4739db520ad9';
    //     const res = await request.delete(`/products/${invalidId}`);
    //     expect(res.statusCode).toBe(400);
    //     expect(res.body.success).toBe(false);
    //     expect(res.body.message).toMatch('Invalid ID format');
    //   });
      
    //   test('DELETE /products/:id for a non-existing ID', async () => {
    //     const nonexistingId = '675aef120b5738db520a5bd9';
    //     const res = await request.delete(`/products/${nonexistingId}`);
    //     expect(res.statusCode).toBe(404);
    //     expect(res.body.success).toBe(false);
    //     expect(res.body.message).toMatch('Product not found');
    //   });
});