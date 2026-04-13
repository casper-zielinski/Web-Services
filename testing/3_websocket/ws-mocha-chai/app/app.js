const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const text = message.toString();
        ws.send(`Echo: ${text}`);
    });
});

app.get('/', (req, res) => {
    res.status(200).send('WebSocket server is running');
});


module.exports = { app, server, wss };