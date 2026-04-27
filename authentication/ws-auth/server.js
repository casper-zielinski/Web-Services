'use strict';

import { USERS } from './db/users.js';

import express from 'express';
import ws from 'ws';

const SERVER_PORT = 3002;

const app = express();

// provide static data (index.html) for frontend
app.use('/', express.static('public'));

const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server is up and running on https://localhost:${SERVER_PORT}`);
});

let clients = [];

/**
 * WebSocket Server to handle websocket communication;
 */
const wss = new ws.Server({ noServer: true, origin: 'msd-webservice' });
wss.on('connection', (client) => {
  client
    .on('message', toEvent)
    .on('authenticate', (data) => {
      // authenticate user
    })
    .on('msg', (data) => {
      // 1. check if client is authenticated
      // if authenticated
      //    receive msg and send it to other clients
      // else
      //    send back error to client
    });

  client.on('close', () => {
    clients = clients.filter((c) => c !== client);
    console.log(
      `${
        client.user ? client.user.username || 'unknown' : 'unauthorized'
      } disconnected`
    );
    console.log(`${clients.length} clients left`);
  });
});

/**
 * Set up WebSocket Connection on Express-HTTPServer
 */
httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (client) => {
    wss.emit('connection', client, request);
  });
});

/**
 * Helper function to convert messages to own events, to use `.on(xxx)` chaining
 * @param {string} message received from ws.onmessage event, should be a JSON-string, containing at least 'type' and 'data'!
 * Origin: https://gist.github.com/jfromaniello/8418116
 */
function toEvent(message) {
  try {
    const event = JSON.parse(message);
    this.emit(event.type, event.data);
  } catch (err) {
    console.error('could not emit event', err);
  }
}
