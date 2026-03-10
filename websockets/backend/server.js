'use strict';

// Import external modules
const WebSocketServer = require('websocket').server;
const http = require('http');
const { htmlEntities, getShuffledColors } = require('./util');
const { WEBSOCKET_SERVER_PORT } = require('./util/config');

// Define WebSocket origin (used for protocol validation)
const WEBSOCKET_ORIGIN = 'msd-webservice';

// Optional: Set process title (visible in system monitoring tools like `ps` or `top`)
process.title = 'node-websocket';

/**
 * Global variables
 */
// Store the last 100 messages for chat history
let history = [];
// Store currently connected clients using a Map for efficient management
const clients = new Map();
// Get a shuffled list of colors for user identification
let availableColors = getShuffledColors();

/**
 * HTTP Server - Used only to initialize the WebSocket connection.
 * We do not handle standard HTTP requests in this server.
 */
const httpServer = http.createServer((req, res) => {
  res.writeHead(501); // 501 = NOT IMPLEMENTED
  res.end();
});

// Start HTTP server to listen for WebSocket connections
httpServer.listen(WEBSOCKET_SERVER_PORT, () => {
  console.log(`WebSocket Server running at: ws://localhost:${WEBSOCKET_SERVER_PORT}`);
});

/**
 * WebSocket Server
 * The WebSocket protocol is an enhanced HTTP request that allows full-duplex communication.
 * More info: http://tools.ietf.org/html/rfc6455#page-6
 */
const wsServer = new WebSocketServer({ httpServer });

// Handle incoming WebSocket connection requests
wsServer.on('request', (request) => {
  let clientId, userName, userColor;
  try {
    console.log(`[INFO] Connection request from origin: ${request.origin}`);

    // Accept connection (optionally, validate origin)
    const connection = request.accept(WEBSOCKET_ORIGIN, request.origin);

    // Generate a unique client ID based on timestamp and randomness
    clientId = Date.now() + Math.random();
    clients.set(clientId, connection);

    console.log(`[INFO] New WebSocket connection established.`);

    // Send chat history to the newly connected client
    if (history.length > 0) {
      connection.sendUTF(JSON.stringify({ type: 'history', data: history }));
    }

    // Event handler for receiving messages from clients
    connection.on('message', (messageRAW) => {
      try {
        // Parse incoming message
        const message = JSON.parse(messageRAW.utf8Data);

        if (message.type === 'incoming-message') {
          // Assign a username and color on the first message received from the user
          if (!userName) {
            userName = htmlEntities(message.data);
            userColor = availableColors.pop() || 'black'; // Assign color or default to black
            connection.sendUTF(JSON.stringify({ type: 'color', data: userColor }));

            console.log(`[INFO] User ${userName} assigned color ${userColor}`);
          } else {
            // Store the message in the history
            const chatMessage = {
              time: Date.now(),
              text: htmlEntities(message.data),
              author: userName,
              color: userColor,
            };

            history.push(chatMessage);
            if (history.length > 100) history.shift(); // Keep only the last 100 messages

            // Broadcast the message to all connected clients
            const json = JSON.stringify({ type: 'chat-message', data: chatMessage });
            clients.forEach(client => client.sendUTF(json));

            console.log(`[MESSAGE] ${userName}: ${message.data}`);
          }
        } else {
          // Send an error message for invalid message types
          sendError(connection, 'Only messages of type "incoming-message" are allowed.');
        }
      } catch (error) {
        // Handle invalid JSON format
        sendError(connection, 'Invalid data format received.');
        console.error(`[ERROR] Invalid message data:`, messageRAW.utf8Data);
      }
    });

    // Event handler for client disconnection
    connection.on('close', () => {
      if (userName && userColor) {
        console.log(`[INFO] User ${userName} disconnected.`);
        availableColors.push(userColor); // Return color to the pool
      }
      clients.delete(clientId);
    });
  } catch (error) {
    // Handle unexpected errors gracefully
    console.error(`[ERROR] Unexpected server error:`, error);
    clients.delete(clientId);
  }
});

/**
 * Send an error message to a specific client.
 * @param {Object} connection - WebSocket connection object
 * @param {String} message - Error message to be sent
 */
const sendError = (connection, message) => {
  connection.sendUTF(JSON.stringify({ type: 'error', data: message }));
};

