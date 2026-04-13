
const WebSocket = require('ws');
const request = require('supertest');
const { app, server } = require('../app/app');

describe('WebSocket API', () => {
    let ws;

    beforeAll((done) => {
        server.listen(8080, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    test('HTTP server should respond to GET request', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('WebSocket server is running');
    });

    test('WebSocket should send and receive messages', (done) => {
        ws = new WebSocket('ws://localhost:8080');

        ws.on('open', () => {
            ws.send('Test Message');
        });

        ws.on('message', (message) => {
            expect(message.toString()).toBe('Received: Test Message');
            ws.close();
            done();
        });
    });
});