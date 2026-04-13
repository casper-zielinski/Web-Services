# 🧪 Testing – REST APIs & WebSockets in Node.js

This repository provides hands-on exercises for testing **JavaScript-based web services**, covering everything from basic unit testing to REST and WebSocket testing using different tools and approaches.

The focus is not just on tools, but on understanding:

* **[what to test](what-to-test.md)**
* **[why testing is important](why-testing-is-important.md)**
* **[how different approaches relate to each other](how-different-approaches-relate-to-each-other.md)**

---

# 🎯 Learning Objectives

After completing these exercises, you should be able to:

* understand fundamental testing concepts
* write and execute automated tests for REST APIs
* test APIs using tools like Postman
* test WebSocket-based communication
* differentiate between testing frameworks and tools
* choose appropriate testing strategies depending on the use case

---

# 🧭 Recommended Learning Path

The exercises are designed to be completed in sequence:

## Basics – Introduction with [Jest testing framework](0_jest/)

📂 `0_jest`

* write your first tests
* understand assertions
* learn test structure and execution

👉 Focus: **How testing works in general**

---

## Automated [REST API Testing](1_rest/)

📂 `1_rest`

* test an Express-based API
* work with HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)
* validate status codes and responses
* handle basic error scenarios

👉 Tools:

* Jest (test framework)
* SuperTest (HTTP testing)

👉 Focus: **Testing inside the code (developer perspective)**

---

## REST API Testing with [Postman](2_postman/)

📂 `2_postman`

* perform manual API testing
* create and use collections
* work with variables
* write simple test scripts

👉 Focus: **Testing outside the code (tester/QA perspective)**

---

## [WebSocket Testing](3_websocket/)

📂 `3_websocket`

This section introduces three different approaches:

### [Standalone WebSocket](3_websocket/ws-only/)

📂 `ws-only`

* pure WebSocket server
* testing with Jest
* focus on connection and message flow

👉 Best for:

* real-time applications without HTTP APIs

---

### WebSocket with [Express + Jest](3_websocket/ws-express/)

📂 `ws-express`

* combined HTTP and WebSocket server
* test both REST and WebSocket behavior
* uses SuperTest

👉 Best for:

* APIs that include real-time features

---

### WebSocket with [Mocha & Chai](3_websocket/ws-mocha-chai/)

📂 `ws-mocha-chai`

* alternative testing setup
* Mocha (test runner)
* Chai (assertions)

👉 Focus:

* understanding different toolchains
* comparing frameworks

---

# 🔧 Tools & Roles Overview

| Tool      | Role                         |
| --------- | ---------------------------- |
| [Jest](https://jestjs.io/)      | All-in-one testing framework |
| [Mocha](https://mochajs.org/)     | Test runner                  |
| [Chai](https://www.chaijs.com/)      | Assertion library            |
| [SuperTest](https://www.npmjs.com/package/supertest) | HTTP/API testing tool        |
| [Postman](https://learning.postman.com/)   | External API testing tool    |

👉 Important:

* tools can vary
* **testing principles remain the same**

---

# 🔁 Types of Tests

| Test Type        | Example in this Repository |
| ---------------- | -------------------------- |
| Unit Test        | `0_jest`                   |
| Integration Test | `1_rest`                   |
| API Test         | `1_rest`, `2_postman`      |
| WebSocket Test   | `3_websocket`              |

---

# ⚠️ Important Concepts

## ✔️ Tests should (mostly) be independent

* especially in Jest-based tests
* avoid dependencies between test cases

## ⚠️ Exception: Postman

* tests may intentionally depend on each other
* e.g. POST → store ID → GET → DELETE

---

## ✔️ Don’t only test the “Happy Path”

Good tests include:

* **Happy Path** → expected correct behavior
* **Edge Cases** → unusual or boundary inputs
* **Error Cases** → invalid inputs and failures

---

## ✔️ REST vs WebSocket

| REST             | WebSocket             |
| ---------------- | --------------------- |
| request-response | persistent connection |
| stateless        | stateful              |
| easier to test   | more complex to test  |

---

# 🟢 Checkpoints

This repository contains multiple **CHECKPOINTS** to validate your progress.

## Distribution:

* REST Testing: 4 checkpoints
* Postman Testing: 1 checkpoint
* WebSocket Testing: 3 checkpoints

---

# 📚 Framework Overview (Reference)

The following files provide additional background:

* 📄 `jest.md`
* 📄 `supertest.md`
* 📄 `mocha.md`
* 📄 `chai.md`

👉 Recommendation:

* complete the exercises first
* use these as reference when needed

---

# 🚀 Practical Recommendation

If you are unsure which approach to use:

* default → **Jest + SuperTest**
* API with WebSockets → **Express + Jest**
* pure WebSockets → **Standalone Jest**
* flexible setup → **Mocha + Chai**

---

# 🧠 Goal of this Repository

This project aims to show that:

* testing is **not just about tools**, but about thinking
* different communication models require different strategies
* well-designed tests are essential for reliable software

---

# References

## **Testing Frameworks**
- [Jest](https://jestjs.io/)
  - [Jest API](https://jestjs.io/docs/en/api)
  - [expect](https://jestjs.io/docs/en/expect)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)

## **API Testing Tools**
- [Postman](https://learning.postman.com/)
  - [Postman API Reference](https://learning.postman.com/docs/postman/scripts/postman-sandbox-api-reference/)
  - [Postman Test Scripts Guide](https://learning.postman.com/docs/postman/scripts/test-scripts/)

## **WebSocket Testing**
- [WebSockets in Node.js](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)
- [ws (WebSocket library for Node.js)](https://www.npmjs.com/package/ws)
- [SuperTest for WebSockets](https://www.npmjs.com/package/supertest)

---

🚀 **Start with `0_jest` and follow the learning path step by step.**
