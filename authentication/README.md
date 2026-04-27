# 🔐 Authentication for REST APIs and WebSockets

In this exercise set, you will extend your existing REST API with different authentication mechanisms and learn how authentication works in both **REST** and **WebSocket-based systems**.

The exercises build on each other and introduce authentication step by step — from simple HTTP headers to token-based authentication and persistent connections.

---

## 📌 Goal of this Exercise Set

By completing these exercises, you should be able to:

- explain the difference between authentication and authorization
- understand how authentication works in stateless REST APIs
- implement authentication using HTTP headers
- secure REST endpoints using JWT tokens
- understand how authentication differs in WebSocket connections
- identify common mistakes in authentication handling

---

## 🧠 Context

So far, your REST API was **publicly accessible**.

In this exercise set, you will:

1. understand how credentials are transmitted
2. replace credentials with tokens
3. protect REST endpoints
4. extend authentication to WebSocket connections

---

## 🧭 Recommended Order

The exercises are designed to be completed in the following order:

---

### Basic Authentication (Concept & HTTP Headers)

📁 [`basic-auth/`](basic-auth)

In this part, you will:

- work with the `Authorization` header
- understand how credentials are sent in HTTP requests
- implement authentication using middleware

> This exercise focuses on understanding the **mechanism**, not production-ready security.

---

### JWT Authentication for REST APIs (Main Exercise)

📁 [`jwt-auth/`](jwt-auth)

In this part, you will:

- implement a `/login` endpoint
- generate JWT tokens
- protect REST endpoints using middleware
- validate tokens on every request
- implement basic authorization logic

> This is the **core exercise** and the most important part of this topic.

---

### WebSocket Authentication (Advanced)

📁 [`ws-auth/`](ws-auth)

In this part, you will:

- authenticate WebSocket connections
- handle authentication after connection setup
- restrict message handling to authenticated clients
- understand the difference between REST and WebSocket authentication

> This exercise builds on JWT and introduces authentication in persistent connections.

---

## ⚠️ Important Notes

- REST APIs are **stateless** → authentication must be validated on every request
- WebSocket connections are **stateful** → authentication is done per connection
- Authentication ≠ Authorization → both must be implemented

---

## 🔗 Additional Resources

You will also find a legacy example:

📁 [`example/form-auth/`](example/form-auth)

This demonstrates cookie-based authentication.  
It is **not required** and only included for reference.

---

## 📊 Summary

| Topic | Folder | Focus |
|------|--------|------|
| Basic Authentication | `basic-auth/` | HTTP headers & concept |
| JWT Authentication | `jwt-auth/` | REST API security |
| WebSocket Authentication | `ws-auth/` | persistent connections |

---

## Documentation
For all checkpoints you must maintain a short documentation in your own repository.
The documentation should include:

- explanation of your implementation
- relevant code snippets
- screenshots of successful API calls
- answers to the checkpoint questions

## Checkpoints

Throughout the exercise you will encounter several **CHECKPOINTS**.

When you reach a checkpoint:

1. Document your results
2. ask the lecturer if you need help
3. ask for feedback if you need some

---

## 🧠 Key Takeaways

- Authentication in REST is **request-based**
- JWT replaces credentials after login
- WebSocket authentication is **connection-based**
- Security must always be enforced on the server

---

Proceed step by step — each exercise builds on the previous one.
