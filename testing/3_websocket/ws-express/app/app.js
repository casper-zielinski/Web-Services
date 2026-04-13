const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        ws.send(`Received: ${message}`);
    });
});

module.exports = { app, server, wss };
