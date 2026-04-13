# Mocha: JavaScript Test Framework

## Overview
Mocha is a **feature-rich JavaScript test framework** that runs on **Node.js and in the browser**. It provides a **flexible and modular** approach to testing and is commonly used for **unit testing, integration testing, and asynchronous testing**. Mocha works seamlessly with assertion libraries like **[Chai](chai.md)** and supports **both synchronous and asynchronous tests**.

## Key Features
✅ **Supports Both Sync & Async Tests** – Handles callbacks, promises, and async/await.  
✅ **Highly Configurable** – Can be extended with plugins and custom reporters.  
✅ **Works in Node.js & Browsers** – Enables cross-environment testing.  
✅ **BDD & TDD Support** – Allows writing tests in multiple styles.  
✅ **Before/After Hooks** – Provides lifecycle methods for better test setup/cleanup.  
✅ **Custom Reporters & Parallel Testing** – Improves test output and performance.

## Use Cases
- **Unit Testing** – Testing individual functions or components.
- **Integration Testing** – Verifying interactions between multiple modules.
- **API Testing** – Testing RESTful APIs when combined with SuperTest.
- **Asynchronous Testing** – Ensuring async functions work correctly.

## Advantages
✔ **Flexible** – Works with different assertion libraries (e.g., Chai, Should.js).  
✔ **Great for Asynchronous Code** – Designed to handle async operations smoothly.  
✔ **Multiple Test Styles** – Supports BDD (`describe`, `it`) and TDD (`suite`, `test`).  
✔ **Rich Plugin Ecosystem** – Extensible with various reporters and integrations.  
✔ **Customizable Execution Flow** – Allows granular control over test execution.

## Disadvantages
❌ **No Built-in Assertions** – Requires external assertion libraries like Chai.  
❌ **Slower Compared to Jest** – Lacks built-in parallel test execution.  
❌ **More Configuration Needed** – Requires additional setup compared to Jest.

## Installation
To install Mocha in a **Node.js project**:

```sh
npm install --save-dev mocha
```

For **Chai assertion support**:
```sh
npm install --save-dev chai
```

## Basic Example
Create a test file (`test.js`):

```javascript
const assert = require('chai').assert;

describe('Array', () => {
  it('should return -1 when the value is not present', () => {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});
```

Run tests with:
```sh
npx mocha
```

## Running Tests & Coverage
Run all tests:
```sh
npx mocha
```
Enable **watch mode**:
```sh
npx mocha --watch
```
Generate a **code coverage report** (requires `nyc`):
```sh
npx nyc mocha
```

## References
- [Mocha Official Documentation](https://mochajs.org/)
- [Mocha API Reference](https://mochajs.org/#interfaces)
- [Chai Assertion Library](https://www.chaijs.com/)
- [SuperTest for API Testing](https://www.npmjs.com/package/supertest)

