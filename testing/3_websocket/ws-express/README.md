# WebSocket Testing with Supertest, Express, and Jest

This guide explains how to test a WebSocket server using **Supertest**, **Express**, and **Jest** in Node.js. It provides a step-by-step setup, including package installation, server creation, test setup, and example usage.

## **1. Install Dependencies**

Ensure you have Node.js installed, then run the following command to install the necessary dependencies:

```sh
npm init -y  # Initialize a package.json if not created
npm install express ws supertest jest
```

This will install:
- `express`: A web framework for Node.js.
- `ws`: A WebSocket implementation for Node.js.
- `supertest`: A testing library for HTTP requests.
- `jest`: A testing framework for JavaScript.



## **2. Create an Express WebSocket Server**

Create a file named `server.js` and add the following code:

```javascript
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

server.listen(8080, () => console.log('Server running on port 8080'));

module.exports = { app, server, wss };
```

This sets up an **Express server** that serves HTTP requests and also manages a **WebSocket server**.



## **3. Create Jest Tests**

Create a test file in `__tests__/websocket.test.js` and add the following code:

```javascript
const WebSocket = require('ws');
const request = require('supertest');
const { server } = require('../server');

describe('WebSocket API', () => {
    let ws;

    beforeAll((done) => {
        server.listen(8080, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    test('HTTP Server should respond to GET request', async () => {
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
            expect(message.toString()).toBe('Echo: Test Message');
            ws.close();
            done();
        });
    });
});
```

This test ensures that:
- The HTTP server is running and responds to a **GET** request.
- The WebSocket client can **connect**, **send a message**, and **receive an echoed response**.

Take care, you have to modify some parts for existing server.js and app.js implementation.

### 🤖 Using AI Support for WebSocket Testing

In this exercise, you may use AI tools (e.g., ChatGPT) to support your learning—especially to explore how WebSocket testing differs from REST testing.

Focus on using AI to **understand message-based and asynchronous behavior**, not just to generate code.

Try experimenting with prompts of different detail levels:

* Start simple (e.g., “Write a WebSocket test using Jest”)
* Add more context (e.g., connection, sending messages, receiving responses)
* Include your actual setup (Express + WebSocket server, echo behavior)

While doing this, observe:

* How does AI handle asynchronous communication?
* Does the generated test correctly wait for messages?
* Are connection handling and cleanup implemented properly?
* What issues occur when the prompt lacks detail?

The goal is to understand that **WebSocket testing requires thinking in events and message flows**, and that AI-generated solutions must be carefully reviewed and adapted.

Now use following AI supported Learning [Instruction](ai-supported-learning.md).

## **4. Configure package.json**

Modify `package.json` to include a test script:

```json
{
  "name": "websocket-testing-supertest",
  "version": "1.0.0",
  "description": "Testing WebSockets with Supertest, Express, and Jest",
  "main": "server.js",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ws": "^8.0.0",
    "supertest": "^6.3.3"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```



## **5. Run Tests**

Run the following command to execute the tests:

```sh
npm test
```

Jest will start the **Express & WebSocket server**, run the tests, and verify the responses.



## **6. Expected Output**

A successful test will output something like:

```
 PASS  __tests__/websocket.test.js
  ✓ HTTP Server should respond to GET request (50ms)
  ✓ WebSocket should send and receive messages (75ms)
```

If the test fails, ensure that the **WebSocket server** and **HTTP server** are correctly running and that port 8080 is not in use.



## **7. Try It Yourself!**

For a simple hands-on example, create a small script to manually test the WebSocket connection.

Create a file named `client.js` and add the following code:

```javascript
const WebSocket = require('ws');

const client = new WebSocket('ws://localhost:8080');

client.on('open', () => {
    console.log('Connected to WebSocket server');
    client.send('Hello from Client');
});

client.on('message', (message) => {
    console.log(`Received from server: ${message.toString()}`);
    client.close();
});
```

Run the script with:

```sh
node client.js
```

Expected output:

```
Connected to WebSocket server
Received from server: Echo: Hello from Client
```

## ⚠️ Important

WebSocket tests are asynchronous and event-based:
- Wait for `open` before sending messages
- Use `done()` to finish the test
- Always close the connection

Otherwise tests may hang or fail unpredictably.

## **Summary**

1. Install `express`, `ws`, `supertest`, and `jest`.
2. Create a WebSocket server using **Express** (`server.js`).
3. Write Jest tests (`__tests__/websocket.test.js`).
4. Configure `package.json`.
5. Run `npm test` to execute WebSocket and HTTP tests.
6. Try the `client.js` script to manually test WebSocket communication.

This setup ensures **robust WebSocket testing** using **Express, Supertest, and Jest** in a Node.js environment. 🚀

