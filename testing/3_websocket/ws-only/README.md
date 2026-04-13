# WebSocket Testing with Jest and ws

This guide explains how to test a WebSocket server using Jest and the `ws` library in Node.js. It provides a step-by-step setup, including package installation, server creation, test setup, and example usage.

## **1. Install Dependencies**

Ensure you have Node.js installed, then run the following command to install the necessary dependencies:

```sh
npm init -y  # Initialize a package.json if not created
npm install ws jest
```

This will install:
- `ws`: A WebSocket implementation for Node.js.
- `jest`: A testing framework for JavaScript.

## **2. Create a WebSocket Server**

Create a file named `server.js` and add the following code:

```javascript
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    socket.on('message', (message) => {
        const text = message.toString(); // Convert Buffer to string if needed
        console.log(`Received: ${text}`);
        socket.send(`Echo: ${text}`);
    });
});

module.exports = server;
```

This sets up a WebSocket server that listens on port 8080 and echoes received messages.


## **3. Create Jest Tests**

Create a test file in `__tests__/websocket.test.js` and add the following code:

```javascript
const WebSocket = require('ws');
const server = require('../server');

describe('WebSocket Server', () => {
    let client;

    beforeAll(() => {
        server; // Ensure the server is running
    });

    afterAll(() => {
        server.close(); // Close server after tests
    });

    test('Client should connect and receive echo message', (done) => {
        client = new WebSocket('ws://localhost:8080');

        client.on('open', () => {
            client.send('Hello Server');
        });

        client.on('message', (message) => {
            const response = message.toString(); // Convert Buffer to string
            expect(response).toBe('Echo: Hello Server');
            client.close();
            done();
        });
    });
});
```

This test ensures that:
- A WebSocket client can connect to the server.
- The client can send a message.
- The server responds with an echoed message.


## **4. Writing Your Own Test Case**

You can extend the tests by adding your own test cases. For example, testing if the server correctly handles multiple messages:

```javascript
test('Client should send multiple messages and receive responses', (done) => {
    client = new WebSocket('ws://localhost:8080');

    const messages = ['First Message', 'Second Message', 'Third Message'];
    let receivedMessages = [];

    client.on('open', () => {
        messages.forEach(msg => client.send(msg));
    });

    client.on('message', (message) => {
        receivedMessages.push(message.toString());
        if (receivedMessages.length === messages.length) {
            expect(receivedMessages).toEqual(messages.map(msg => `Echo: ${msg}`));
            client.close();
            done();
        }
    });
});
```

This test verifies that:
- The client can send multiple messages.
- The server correctly echoes each message.

Feel free to modify the test cases to experiment with different WebSocket behaviors.

## **5. Configure package.json**

Modify `package.json` to include a test script:

```json
{
  "name": "websocket-testing",
  "version": "1.0.0",
  "description": "Testing WebSockets with Jest and ws",
  "main": "server.js",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "ws": "^8.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```


## **6. Run Tests**

Run the following command to execute the tests:

```sh
npm test
```

Jest will start the WebSocket server, run the test, and verify the response.


## **7. Expected Output**

A successful test will output something like:

```
 PASS  __tests__/websocket.test.js
  ✓ Client should connect and receive echo message (50ms)
  ✓ Client should send multiple messages and receive responses (75ms)
```

If the test fails, ensure that the WebSocket server is running properly and that port 8080 is not in use.

## **8. Try It Yourself!**

For a simple hands-on example, create a small script to manually test the WebSocket connection.

Create a file named `client.js` and add the following code:

```javascript
const WebSocket = require('ws');

const client = new WebSocket('ws://localhost:8080');

client.on('open', () => {
    console.log('Connected to WebSocket server');
    client.send('Test message');
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
Received from server: Echo: Test message
```

## **Summary**

1. Install `ws` and `jest`.
2. Create a WebSocket server (`server.js`).
3. Write Jest tests (`__tests__/websocket.test.js`).
4. Write additional test cases.
5. Configure `package.json`.
6. Run `npm test` to execute the WebSocket test.
7. Try the `client.js` script to manually test WebSocket communication.

This setup ensures reliable WebSocket testing in a Node.js environment. 🚀


## 🟢 **CHECKPOINT TST-WS-1: Verify WebSocket Server & Test Setup**
**Objective:** Ensure the WebSocket server and Jest testing setup are correctly configured before running the tests.

📍 **Steps to Complete:**
1. **Verify WebSocket Server is Running**
    - Start the WebSocket server manually:
      ```sh
      node server.js
      ```
    - Using your simple client demo manually:
      ```sh
      node client.js
      ```

2. **Check Jest Installation**
    - Run:
      ```sh
      npm list jest
      ```
    - Ensure Jest appears under `devDependencies`.

3. **Ensure the Test File Exists**
    - Confirm `__tests__/websocket.test.js` exists and contains **at least one test case**.
    - 
4. **Ensure the Test will be executed correctly**
    - Run:
      ```sh
      npm test
      ```
    - Ensure test will run successfully without any error.

🟢 **CHECKPOINT TST-WS-1 Submission:**
- Take a **screenshot** of:
    1. The WebSocket server running (`server.js` output).
    2. A successful WebSocket test using `npm test`.
    3. Jest test file structure (`__tests__/websocket.test.js` visible in the project).
- Attach the screenshots to the documentation.


## **Summary**

1. Install `ws` and `jest`.
2. Create a WebSocket server (`server.js`).
3. Write Jest tests (`__tests__/websocket.test.js`).
4. Configure `package.json`.
5. Run `npm test` to execute the WebSocket test.

This setup ensures reliable WebSocket testing in a Node.js environment. 🚀

