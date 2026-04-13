// WebSocket with Jest and ws testing

const WebSocket = require('ws');
const server = require('../server'); // Importiere den WebSocket-Server

describe('WebSocket Server', () => {
    let client;

    beforeAll(() => {
        server; // Stelle sicher, dass der Server läuft
    });

    afterAll(() => {
        server.close(); // Schließe den Server nach den Tests
    });

    test('Client kann sich verbinden und Nachrichten senden/empfangen', (done) => {
        client = new WebSocket('ws://localhost:8080');

        client.on('open', () => {
            client.send('Hello Server');
        });

        client.on('message', (message) => {
            const response = message.toString();
            expect(response).toBe('Echo: Hello Server');
            client.close();
            done();
        });
    });

    test('Client kann mehrere Nachrichten senden und empfangen', (done) => {
        client = new WebSocket('ws://localhost:8080');

        const messages = ['First Message', 'Second Message', 'Third Message'];
        const received = [];

        client.on('open', () => {
            messages.forEach(msg => client.send(msg));
        });

        client.on('message', (message) => {
            received.push(message.toString());
            if (received.length === messages.length) {
                expect(received).toEqual(messages.map(msg => `Echo: ${msg}`));
                client.close();
                done();
            }
        });
    });
});
