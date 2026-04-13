# WebSocket Testing with Mocha and Chai

This guide explains how to test a WebSocket server using **Mocha** and **Chai** in Node.js. It provides a step-by-step setup, including package installation, server creation, test setup, and example usage.

## **1. Install Dependencies**

Ensure you have Node.js installed, then run the following command to install the necessary dependencies:

```sh
npm init -y  # Initialize a package.json if not created
npm install express ws mocha chai chai-http
```

This will install:

- `express`: A web framework for Node.js.
- `ws`: A WebSocket implementation for Node.js.
- `mocha`: A JavaScript testing framework.
- `chai`: An assertion library for testing.
- `chai-http`: For testing HTTP endpoints.



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



## **3. Create Mocha & Chai Tests**

Create a test file in `test/websocket.test.js` and add the following code:

```javascript
const WebSocket = require('ws');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('WebSocket API', function () {
    let ws;

    before((done) => {
        server.listen(8080, done);
    });

    after((done) => {
        server.close(done);
    });

    it('should respond to HTTP GET request', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('WebSocket server is running');
                done();
            });
    });

    it('should send and receive WebSocket messages', function (done) {
        ws = new WebSocket('ws://localhost:8080');

        ws.on('open', () => {
            ws.send('Test Message');
        });

        ws.on('message', (message) => {
            expect(message.toString()).to.equal('Echo: Test Message');
            ws.close();
            done();
        });
    });
});
```

This test ensures that:

- The HTTP server is running and responds to a **GET** request.
- The WebSocket client can **connect**, **send a message**, and **receive an echoed response**.


## **4. Configure package.json**

**Take care about using Mocha v10 and Chai v4.**

Modify `package.json` to include a test script:

```json
{
  "name": "websocket-testing-mocha-chai",
  "version": "1.0.0",
  "description": "Testing WebSockets with Mocha and Chai",
  "main": "server.js",
  "scripts": {
    "test": "mocha"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ws": "^8.0.0",
    "chai": "^4.3.6",
    "chai-http": "^4.3.0"
  },
  "devDependencies": {
    "mocha": "^10.0.0"
  }
}
```



## **5. Run Tests**

Run the following command to execute the tests:

```sh
npm test
```

Mocha will start the **Express & WebSocket server**, run the tests, and verify the responses.


## **6. Expected Output**

A successful test will output something like:

```
 PASS  test/websocket.test.js
  ✓ should respond to HTTP GET request (50ms)
  ✓ should send and receive WebSocket messages (75ms)
```

If the test fails, ensure that the **WebSocket server** and **HTTP server** are correctly running and that port 8080 is not in use.


## 🟢 **CHECKPOINT TST-WS-2: Verify WebSocket Server & Mocha Test Setup**

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

2. **Check Mocha Installation**

    - Run:
      ```sh
      npm list mocha
      ```
    - Ensure Mocha appears under `devDependencies`.

3. **Ensure the Test File Exists**

    - Confirm `test/websocket.test.js` exists and contains **at least one test case**.

4. **Ensure the Test will be executed correctly**

    - Run:
      ```sh
      npm test
      ```
    - Ensure tests execute successfully.

🟢 **CHECKPOINT TST-WS-2 Submission:**

- Take a **screenshot** of:
    1. The WebSocket server running (`server.js` output).
    2. A successful WebSocket test using `npm test`.
    3. **The Mocha test file structure (**``** visible in the project).**
- Attach the screenshots to the documentation.


## **Summary**

1. Install `express`, `ws`, `mocha`, `chai`, and `chai-http`.
2. Create a WebSocket server using **Express** (`server.js`).
3. Write Mocha & Chai tests (`test/websocket.test.js`).
4. Configure `package.json`.
5. Run `npm test` to execute WebSocket and HTTP tests.
6. Complete **CHECKPOINT TST-WS-2** to verify setup.

This setup ensures **robust WebSocket testing** using **Mocha and Chai** in a Node.js environment. 🚀

