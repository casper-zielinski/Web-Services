# 📘 OpenAPI Self-Learning Exercise – Getting Started with API Documentation (Swagger)

## 🧭 Goal of this Exercise

This self-guided activity introduces you to **OpenAPI / Swagger** and helps you understand how to document, test, and structure modern APIs.

You'll work **independently**, using **AI (e.g. ChatGPT)**, reliable online resources, and a **simple hands-on example**.
We recommend starting with **REST APIs** – they’re ideal for beginners.

👉 You will use Swagger UI as your main working tool:
`http://localhost:3000/docs`

---

## ⚠️ Important Note

OpenAPI is **documentation – not implementation**.

* The OpenAPI file describes what the API *should* do
* The server code defines what the API *actually* does

These two can differ.

👉 Part of this exercise is to **identify and understand these differences**.

---

## 🔁 Recommended Workflow

For each checkpoint:

1. Read the task
2. Work directly in `openapi.yaml`
3. Test your changes in Swagger UI
4. Reflect your findings in `notes.md`
5. Discuss results with your instructor

Repeat this cycle for each OPEN-XXX section.

---

## ✅ Your Assignment

1. Carefully read the **10 guiding questions** below.
2. Use AI tools and trusted sources (e.g. swagger.io, mdn, postman.com) to research answers.
3. Create **practical examples** in YAML or JSON.
4. Keep your findings in a notes file (e.g. `notes.md`).
5. Work directly with the provided project:

    * Explore `openapi.yaml`
    * Compare it with `server.js`
    * Test endpoints via Swagger UI (`/docs`)
6. Optionally extend the API (e.g. new endpoints, schemas, or improvements).
7. Discuss each **checkpoint (OPEN-001 to OPEN-010)** with your instructor as you progress.

💡 Tip: Focus on understanding and explaining – not just copying examples.

---

## 🔟 The 10 Guiding Questions (with Checkpoints)

### 1. [✅-001 – Why OpenAPI](open-001-why.md)?

**What is the purpose of OpenAPI / Swagger, and what problems does it solve?**

> 🧠 Reflect on how OpenAPI is used in real-world projects.
> **Checkpoint:** Write a short summary explaining the benefits.

---

### 2. [OPEN-002 – Structure of an OpenAPI Specification](open-002-structure.md)

**How is an OpenAPI file structured – and what are the key sections?**

> 📂 Explore sections like `info`, `paths`, `components`, etc.
> **Checkpoint:** Identify and explain the main sections.

---

### 3. [OPEN-003 – Describing an Endpoint](open-003-endpoint.md)

**How do you document a full REST endpoint?**

> 🔍 Define parameters, request bodies, responses, and status codes.
> **Checkpoint:** Create and explain a complete endpoint.

---

### 4. [OPEN-004 – Understanding Schemas](open-004-schema.md)

**What are `components.schemas` – and how do they improve structure and reuse?**

> 💡 Create or extend a schema and reference it.
> **Checkpoint:** Use your schema in an endpoint.

---

### 5. [OPEN-005 – Tools to Test & Visualize OpenAPI](open-005-tools.md)

**Which tools help you test and visualize your API?**

> 🧪 Use Swagger UI and at least one additional tool.
> **Checkpoint:** Demonstrate and reflect on your usage.

---

### 6. [OPEN-006 – Documenting Security](open-006-security.md)

**How do you define authentication (e.g. Bearer Token)?**

> 🔐 Add and apply a security scheme.
> **Checkpoint:** Show where and how it is used.

---

### 7. [OPEN-007 – Reusability with `$ref`](open-007-reusability.md)

**How does `$ref` improve maintainability?**

> 🔁 Reuse schemas, parameters, or responses.
> **Checkpoint:** Use at least two `$ref` references.

---

### 8. [OPEN-008 – Error Handling & Status Codes](open-008-error-handling-status-codes.md)

**How do you document errors properly?**

> ⚠️ Add and explain error responses (`400`, `404`, `500`).
> **Checkpoint:** Provide structured error documentation.

---

### 9. [OPEN-009 – Documentation vs. Implementation](open-009-documentation-examples.md)

**What is the difference between documentation and implementation?**

> 🔧 Compare OpenAPI and backend code.
> **Checkpoint:** Identify differences and explain them.

---

### 10. [OPEN-010 – What Makes Good API Documentation?](open-010-good-documentation.md)

**What makes API documentation clear and useful?**

> 📘 Improve your API spec and evaluate it.
> **Checkpoint:** Show improvements and reflect on quality.

---

## 📦 Deliverables

By the end of this exercise, you should have:

* A completed or improved `openapi.yaml` file
* A `notes.md` file with reflections for each checkpoint
* At least one extended or improved endpoint
* Reusable schemas and `$ref` usage
* Documented error handling
* Optional: documented security

---

## 📎 Evaluation & Assessment

👉 The checkpoints (OPEN-001 to OPEN-010) are primarily used for **orientation and structured learning**.

The actual evaluation is based on:

* **Practical discussion with the instructor**
* **Mini-tests (theoretical and practical understanding)**

👉 This means:

* Understanding is more important than completeness
* You should be able to **explain your decisions and structure**, not just show code

---

## 📎 Recommendation

Keep your YAML file for future use – it can be extended and linked to:

* Code generators
* Mock servers
* Automated tests
* Documentation tools

---

## 🤖 Getting AI Support

Before you begin, you can ask your AI assistant:

> **"I want to understand how OpenAPI works and how I can use it to describe and document a REST API. Please guide me through the key concepts like specification structure, endpoint definitions, schemas, and tools like Swagger UI."**

You can extend this by adding:

> **"Please act like a tutor. Ask me questions to check my understanding, and suggest tasks I can try on my own."**

Use AI as support – not as a shortcut. Document your prompts and insights in your notes.

---

## 🎯 Final Thought

Your OpenAPI file is not just documentation.
It is:

* a **communication tool**
* a **testing interface**
* a **contract between systems**

Make it:

* clear
* consistent
* complete
* usable
