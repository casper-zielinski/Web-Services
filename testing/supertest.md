# SuperTest: HTTP Testing for Node.js

## Overview
SuperTest is a **high-level HTTP testing library** designed for **testing RESTful APIs in Node.js applications**. It simplifies **integration testing** by allowing requests to be made to an Express (or other) application **without needing to run a server**. SuperTest works seamlessly with testing frameworks like **[Jest](jest.md), [Mocha](mocha.md), and [Chai](chai.md)**.

## Key Features
✅ **No Need for a Running Server** – Tests APIs without launching a separate HTTP server.  
✅ **Promise & Async/Await Support** – Simplifies asynchronous API testing.  
✅ **Built-in Assertions** – Provides `.expect()` for response validation.  
✅ **Middleware & Header Testing** – Ensures correct headers and authentication handling.  
✅ **Full HTTP Method Support** – Easily test `GET`, `POST`, `PUT`, `DELETE`, etc.  
✅ **Seamless Integration** – Works well with Jest, Mocha, and Chai.

## Use Cases
- **REST API Testing** – Validating API request responses.
- **Middleware Testing** – Ensuring authentication, logging, or error handling work correctly.
- **Integration Testing** – Verifying interactions between different API endpoints.
- **Mock API Testing** – Simulating API behavior before full deployment.

## Advantages
✔ **Easy to Set Up** – Requires minimal configuration.  
✔ **Fast Execution** – No need for a real server, reducing test runtime.  
✔ **Readable Syntax** – Intuitive `.expect()` chaining for assertions.  
✔ **Flexible** – Works with Express, Koa, Fastify, NestJS, and more.  
✔ **Supports Cookies & Authentication** – Easily test authentication flows.

## Disadvantages
❌ **Limited Browser Testing** – Designed for backend API testing only.  
❌ **Not a Full Testing Framework** – Needs Jest or Mocha for test execution.  
❌ **No Built-in Mocking** – Requires additional libraries for mock handling.

## Installation
To install SuperTest in a **Node.js project**:

```sh
npm install --save-dev supertest
```

For **Jest integration**:
```sh
npm install --save-dev jest supertest
```

## Basic Example
Create an Express application (`app.js`):
```javascript
const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

module.exports = app;
```

Create a test file (`app.test.js`):
```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /user', () => {
  it('responds with JSON containing user data', async () => {
    const response = await request(app)
      .get('/user')
      .set('Accept', 'application/json');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'John Doe' });
  });
});
```

Run tests with:
```sh
npm test
```

## Running Tests & Coverage
Run all tests:
```sh
npm test
```
Generate a **code coverage report**:
```sh
npm test -- --coverage
```

## References
- [SuperTest Official Documentation](https://www.npmjs.com/package/supertest)
- [Jest API Reference](https://jestjs.io/docs/en/api)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Express.js](https://expressjs.com/)
