## 🧩 OPEN-003 – Describing an Endpoint

### 🎯 Learning Goal

Learn how to define a full **REST endpoint** in OpenAPI, including:

* The HTTP method (e.g. GET, POST)
* Path parameters
* Request body (if needed)
* Response format and status codes

You should be able to write and understand a complete endpoint definition and relate it to a **real implementation** in this project.

---

### 📝 Task

1. **Work with the provided project**

    * Open `openapi.yaml`
    * Start the server (`npm start`)
    * Open Swagger UI:
      👉 [http://localhost:3000/docs](http://localhost:3000/docs)
    * Locate existing endpoints like `/todos` and `/todos/{id}`

2. **Understand an existing endpoint**

    * Choose one endpoint (e.g. `GET /todos/{id}`)
    * Answer:

        * What does this endpoint do?
        * Which parameters does it use?
        * What does the response look like?
        * Which status codes are defined?

3. **Create your own endpoint**

   Add a new endpoint to your `openapi.yaml`, for example:

    * `/todos/search`
    * `/todos/{id}/complete`
    * `/books` (new resource)

   Your endpoint should include:

    * One **HTTP method** (`GET`, `POST`, `PUT`, or `DELETE`)
    * `summary` and `description`
    * Parameters (if applicable, e.g. path or query)
    * Request body (if applicable)
    * At least one response (`200` or `201`)
    * At least one additional response (e.g. `404` or `400`)

4. **Reuse existing schemas**

    * Use `$ref` with `components.schemas` where possible
    * Do not duplicate structures inline if a schema already exists

5. **Validate your result**

    * Reload Swagger UI
    * Check if your endpoint appears correctly
    * Try to understand how Swagger renders your definition

6. **Write a short explanation** (4–6 sentences):

    * What your endpoint does
    * What input it expects
    * What output it returns
    * What happens in error cases
    * Whether it matches the current server implementation (or not)

📌 Save your changes in `openapi.yaml` and your notes in `notes.md`.

---

### 🧪 Example (for inspiration)

```yaml
paths:
  /books/{id}:
    get:
      summary: Get a book by ID
      description: Returns a single book based on its ID
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        '200':
          description: A single book
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found
```

---

### 💬 Suggested Prompt for AI Support

> **"How do I describe a REST endpoint in OpenAPI 3.0, including parameters, request body, and response?"**

Follow-up ideas:

> **"Can you give me an OpenAPI example for POST /notes with a JSON body and a 201 response?"**
> **"What’s the difference between `query`, `path`, and `header` parameters in OpenAPI?"**

---

### ✅ Checkpoint Review: OPEN-003

📎 Prepare to show:

* One **existing endpoint explained**
* One **new endpoint added to your `openapi.yaml`**
* Correct use of:

    * parameters
    * requestBody (if needed)
    * responses
* A short explanation of:

    * what happens when the endpoint is called
    * how it appears in Swagger UI

**Bonus:**

* Show a mismatch (if any) between documentation and implementation

✅ If complete → Mark OPEN-003 as **checked off**.

---

### 💡 Optional Challenge

Try expanding your endpoint with:

* A `description` field
* Multiple responses (`200`, `400`, `404`)
* An example request or response
* A query parameter (e.g. `/todos?completed=true`)

Or think weiter:

> “Does my OpenAPI endpoint actually match what the server does – or is it only documentation?”
