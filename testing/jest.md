# Jest: JavaScript Testing Framework

## Overview
Jest is a powerful **JavaScript testing framework** designed for **simplicity, efficiency, and ease of use**. Developed by **Meta (Facebook)**, it is widely used for testing **Node.js applications, frontend frameworks like React, and general JavaScript codebases**. Jest comes with built-in features for **unit testing, integration testing, and snapshot testing**, making it a preferred choice for many developers.

## Key Features
✅ **Zero Configuration** – Works out of the box without additional setup.  
✅ **Fast Execution** – Runs tests in parallel for improved performance.  
✅ **Built-in Mocking** – Simplifies testing by allowing function, module, and timer mocks.  
✅ **Snapshot Testing** – Ensures UI components remain unchanged over time.  
✅ **Code Coverage Reports** – Provides insights into untested code sections.  
✅ **Asynchronous Testing** – Supports async/await and Promises for modern JS workflows.  
✅ **TypeScript Support** – Works seamlessly with TypeScript.

## Test File Location & Naming Conventions
Jest automatically detects test files based on their location and naming conventions. By default, Jest looks for:
- Files inside a `__tests__` directory.
- Files with `.test.js`, `.test.ts`, `.spec.js`, or `.spec.ts` extensions.

**Good Practice:** Storing test files inside a `__tests__` directory is a widely recommended approach. It keeps the test files organized and separate from the main source code. However, Jest will also recognize test files placed alongside source files if they follow the `.test.js` or `.spec.js` naming pattern. The choice depends on the project's structure and preferences.

## Use Cases
- **Unit Testing** – Testing individual functions or modules.
- **Integration Testing** – Validating interactions between multiple components.
- **Frontend Testing** – Ensuring React, Vue, or Angular components behave as expected.
- **API Testing** – Verifying RESTful API responses in backend services.
- **Snapshot Testing** – Capturing UI component states to detect unexpected changes.

## Advantages
✔ **Easy to Set Up** – No configuration required for most JavaScript projects.  
✔ **Rich API** – Extensive built-in matchers for powerful assertions.  
✔ **Excellent Documentation** – Well-maintained and beginner-friendly.  
✔ **Great Ecosystem** – Integrates well with SuperTest, Puppeteer, and other tools.  
✔ **Works with Any JavaScript Codebase** – Supports both client-side and server-side testing.

## Disadvantages
❌ **Performance Overhead** – Can be slower in large test suites.  
❌ **Snapshot Maintenance** – Requires frequent updates in rapidly changing UI projects.  
❌ **Limited Built-in Browser Testing** – Requires Puppeteer or Playwright for browser-based testing.

## Installation
To install Jest in a **Node.js project**:

```sh
npm install --save-dev jest
```

For **TypeScript support**:
```sh
npm install --save-dev @types/jest ts-jest
```

## Basic Example
Create a file `sum.js`:
```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Create a test file `sum.test.js`:
```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
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
- [Jest Official Documentation](https://jestjs.io/)
- [Jest API Reference](https://jestjs.io/docs/en/api)
- [Jest Expect Matchers](https://jestjs.io/docs/en/expect)
- [Testing Asynchronous Code](https://jestjs.io/docs/en/asynchronous)
- [Mock Functions in Jest](https://jestjs.io/docs/en/mock-functions)
