'use strict';

// Load dotenv module to read .env file
require('dotenv').config();
const path = require('path');

// Set WebSocket server port (default: 8081)
const WEBSOCKET_SERVER_PORT = process.env.WEBSOCKET_SERVER_PORT || 8081;

// Define runtime environment (default: development)
const NODE_ENV = process.env.NODE_ENV?.trim() || 'development';

// Validate environment variables
if (!process.env.WEBSOCKET_SERVER_PORT) {
    console.warn(`[WARNING] WEBSOCKET_SERVER_PORT not set in .env. Using default: ${WEBSOCKET_SERVER_PORT}`);
}

// Log configuration (only in development mode)
if (NODE_ENV !== 'production') {
    console.log(`[INFO] WebSocket Server running on port: ${WEBSOCKET_SERVER_PORT}`);
    console.log(`[INFO] Environment: ${NODE_ENV}`);
}

// Export configurations
module.exports = { NODE_ENV, WEBSOCKET_SERVER_PORT };
