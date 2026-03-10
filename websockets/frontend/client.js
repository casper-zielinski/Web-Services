'use strict';

import { SERVER_PORT } from './server-port.js';

// Get elements using `document.getElementById` and `document.querySelector`
const content = document.getElementById('content');
const input = document.getElementById('input');
const status = document.getElementById('status');

// Set initial status text
status.textContent = 'Connecting...';

// User-specific data
let myColor;
let myName;

// Ensure WebSocket compatibility for older browsers (Mozilla fallback)
window.WebSocket = window.WebSocket || window.MozWebSocket;

// Check if the browser supports WebSockets
if (!window.WebSocket) {
  content.innerHTML = '<p>Sorry, but your browser does not support WebSockets!</p>';
  input.style.display = 'none';
  status.style.display = 'none';
  throw new Error('WebSocket not supported by this browser');
}

// Open WebSocket connection
const connection = new WebSocket(`ws://127.0.0.1:${SERVER_PORT}`, 'msd-webservice');

// WebSocket 'open' event
connection.onopen = () => {
  input.removeAttribute('disabled');
  input.value = '';
  input.setAttribute('placeholder', 'Choose name');
  status.textContent = 'Choose name: ';
};

// WebSocket 'error' event
connection.onerror = (error) => {
  console.error(error);
  status.textContent = 'ERROR';
  content.innerHTML = '<p>Sorry, a connection issue occurred, or the server is down.</p>';
};

// WebSocket 'message' event - Handles incoming messages from the server
connection.onmessage = (message) => {
  let json;
  try {
    json = JSON.parse(message.data);
    console.log(json);
  } catch (error) {
    console.error('Invalid data from server:', message);
    return;
  }

  switch (json.type) {
    case 'color':
      myColor = json.data;
      status.textContent = `${myName}: `;
      status.style.color = myColor;
      input.setAttribute('placeholder', 'Enter your message');
      input.removeAttribute('disabled');
      input.focus();
      break;
    case 'history':
      json.data.forEach(chatMsg => addMessage(chatMsg.author, chatMsg.text, chatMsg.color, new Date(chatMsg.time)));
      break;
    case 'chat-message':
      input.removeAttribute('disabled');
      input.focus();
      const chatMsg = json.data;
      addMessage(chatMsg.author, chatMsg.text, chatMsg.color, new Date(chatMsg.time));
      break;
    default:
      console.warn("Unknown message type received:", json);
  }
};

// Send message when the user presses Enter key
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const msg = input.value.trim();
    if (!msg) return;

    // Send message as JSON string
    connection.send(JSON.stringify({ type: 'incoming-message', data: msg }));

    // Clear and disable input field temporarily
    input.value = '';
    input.setAttribute('disabled', 'true');

    // First message is the username
    if (!myName) {
      myName = msg;
    }
  }
});

/**
 * Adds a new message to the chat content.
 * @param {string} author - The message sender
 * @param {string} msg - The message content
 * @param {string} color - The assigned user color
 * @param {Date} timestamp - The message timestamp
 */
function addMessage(author, msg, color, timestamp) {
  const selfClass = author === myName ? 'self' : '';
  const messageElement = document.createElement('p');
  messageElement.className = `chat-message ${selfClass}`;
  messageElement.innerHTML = `<span class="chat-name" style="color: ${color};">${author}</span> @ [${formattedTimeStamp(timestamp)}]: ${msg}`;
  content.prepend(messageElement);
}

/**
 * Formats a timestamp into HH:MM format.
 * @param {Date} date - The date object to format
 * @returns {string} - Formatted timestamp
 */
function formattedTimeStamp(date) {
  return `${lpad(date.getHours())}:${lpad(date.getMinutes())}`;
}

/**
 * Pads a number with leading zeros.
 * @param {number} num - The number to pad
 * @param {number} size - The desired string length (default is 2)
 * @param {string} pad - The padding character (default is '0')
 * @returns {string} - Padded string
 */
function lpad(num, size = 2, pad = '0') {
  return num.toString().padStart(size, pad);
}
