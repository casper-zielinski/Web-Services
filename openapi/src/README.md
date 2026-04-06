# 📘 OpenAPI To-do Mock API – Express.js & Swagger

This project provides a **hands-on example** of a simple RESTful API documented with **OpenAPI 3.0** and implemented using **Node.js (Express.js)**.

The goal is to **understand the connection between documentation and actual implementation**, and to explore how tools like Swagger UI help in building and testing APIs.

---

## 🧭 How This Project Fits Into the Exercise

This project is your **working example** for the OpenAPI self-learning exercise.

You will:

* Explore and modify `openapi.yaml`
* Compare documentation with implementation (`server.js`)
* Test your API using Swagger UI
* Apply concepts from OPEN-001 to OPEN-010 directly in this project

---

## 🧱 Project Structure

```
todo-api/
├── openapi.yaml         # OpenAPI specification (Swagger format)
├── server.js            # Express server with mock endpoints
├── package.json         # Project metadata and dependencies
└── README.md            # You are here
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd todo-api
npm install
```

### 2. Run the API server

```bash
npm start
```

You will see:

```
To-do API running at http://localhost:3000
Swagger UI available at http://localhost:3000/docs
```

👉 Swagger UI is your main tool for exploring and testing the API.

---

## 🔁 Recommended Workflow

1. Start the server (`npm start`)
2. Open Swagger UI (`/docs`)
3. Explore existing endpoints
4. Modify `openapi.yaml`
5. Reload Swagger UI and observe changes
6. Compare results with `server.js`

Repeat this while working through the OPEN-XXX checkpoints.

---

## 🔄 Available API Endpoints

| Method | Route            | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/todos`     | Get all to-do items     |
| POST   | `/api/todos`     | Create a new to-do      |
| GET    | `/api/todos/:id` | Get a specific to-do    |
| PUT    | `/api/todos/:id` | Update a specific to-do |
| DELETE | `/api/todos/:id` | Delete a specific to-do |

Each endpoint is **documented in `openapi.yaml`** and rendered through Swagger UI.

---

## 🧠 Educational Purpose

### ✅ Why This Project?

* Learn how to **describe** an API with OpenAPI 3.0
* See how an **actual backend** implements the specification
* Explore how Swagger UI **renders documentation**
* Practice **API testing** directly in the browser

⚠️ Important:

The OpenAPI file and the server implementation are **not automatically synchronized**.

* `openapi.yaml` describes the API
* `server.js` implements the API

👉 Part of this exercise is to identify and understand differences between both.

---

## 📘 Swagger UI

After running the server, open:

```
http://localhost:3000/docs
```

This provides:

* Live documentation
* Interactive testing interface (`Try it out`)
* Immediate feedback on request/response behavior

👉 Use this as your primary tool during the exercise.

---

## 🎯 What You Should Do

While working with this project, you should:

* Extend or modify endpoints in `openapi.yaml`
* Create and reuse schemas (`components.schemas`)
* Use `$ref` to avoid duplication
* Add proper error handling (`400`, `404`, `500`)
* Improve documentation with descriptions and examples
* Optionally add and document security
* Continuously test everything in Swagger UI

---

## 🧪 About Examples

Examples are a key part of good API documentation.

Make sure to:

* Add `example` values in schema properties
* Provide request and response examples
* Verify how they appear in Swagger UI

👉 Good examples make your API easier to understand and test.

---

## 🔐 About Authentication

This example **does not implement security** yet – all routes are public.

👉 Challenge:

* Add a `Bearer Token` definition in `openapi.yaml`
* Apply it to selected endpoints
* (Optional) Extend `server.js` with a simple validation check

---

## 🧪 Tools Used

* **Express.js** – Minimal Node.js framework for HTTP APIs
* **Swagger UI Express** – Middleware to serve the API docs
* **YAMLJS** – Load `openapi.yaml` into JavaScript
* **uuid** – Generate unique IDs

---

## 📝 Didactic Notes (for Students)

| Concept                  | Where to find it / Task                                         |
| ------------------------ | --------------------------------------------------------------- |
| OpenAPI basics           | Explore `openapi.yaml`: structure, `paths`, `schemas`           |
| Reusable components      | See `components.schemas` with `$ref` usage                      |
| CRUD operations          | Observe how all 4 verbs are used in `/todos/:id`                |
| Status codes & responses | Check how responses are documented vs. implemented              |
| Live testing             | Try modifying or adding items via Swagger UI                    |
| Spec vs. Implementation  | Compare what’s written in YAML with what's coded in `server.js` |

👉 Do not just read these concepts – actively modify the OpenAPI file and verify your changes in Swagger UI.

---

## 🧩 Ideas for Extensions

* Add **API Key** or **Bearer Auth**
* Introduce a **persistent storage** (JSON file or database)
* Add **validation** based on OpenAPI
* Use **OpenAPI generators** (clients or server stubs)
* Build a small **frontend** consuming `/api/todos`

---

## 📚 Resources

* [OpenAPI Specification](https://swagger.io/specification/)
* [Swagger UI](https://swagger.io/tools/swagger-ui/)
* [Swagger Editor](https://editor.swagger.io)
* [Postman](https://www.postman.com/)
* [Express.js](https://expressjs.com/)

---

## 📎 Feedback & Checkpoints

> During your self-study phase, refer back to the 10 core questions in the main README.
> Discuss each **checkpoint (OPEN-001 to OPEN-010)** with your instructor.

👉 The checkpoints are used for **orientation and structured learning**.

---

## 📎 Evaluation Note

Assessment is based on:

* **Practical discussion with the instructor**
* **Mini-tests (theoretical and practical understanding)**

👉 Focus on:

* explaining your decisions
* understanding the structure
* not just completing tasks

---

🎯 **Goal**: Learn to write, test, document, and explain your own API using modern industry tools.
