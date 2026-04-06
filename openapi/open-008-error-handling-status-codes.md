## 🧩 OPEN-008 – Error Handling & Status Codes

### 🎯 Learning Goal

Learn how to properly document **error responses** and **HTTP status codes** in OpenAPI.
You should be able to define and describe what happens when something goes wrong – and make it transparent for API consumers.

You should also understand the difference between **documented errors** and **actual backend behavior**.

---

### 📝 Task

1. **Work with the provided project**

   * Start the API and open Swagger UI
     👉 [http://localhost:3000/docs](http://localhost:3000/docs)
   * Test endpoints:

      * Call `/todos/{id}` with a non-existing ID
      * Observe the response

   👉 Question: Is the error clearly described for API users?

2. **Understand status codes**

   * Review common HTTP status codes:

      * `200` = OK
      * `201` = Created
      * `204` = No Content
      * `400` = Bad Request
      * `404` = Not Found
      * `500` = Server Error

   Think about:

   * When does each one occur in your API?

3. **Add error responses to your API**

   Extend your `openapi.yaml`:

   * Add at least **3 error responses**:

      * `400` (invalid input)
      * `404` (not found)
      * `500` (server error)

   Example:

   ```yaml
   '404':
     description: Todo not found
   ```

4. **Create a reusable error schema (recommended)**

   ```yaml
   components:
     schemas:
       Error:
         type: object
         properties:
           message:
             type: string
             example: "Todo not found"
           code:
             type: integer
             example: 404
   ```

5. **Use the schema in responses**

   ```yaml
   '404':
     description: Resource not found
     content:
       application/json:
         schema:
           $ref: '#/components/schemas/Error'
   ```

6. **Optional: Make errors reusable with `$ref`**

   ```yaml
   components:
     responses:
       NotFound:
         description: Resource not found
   ```

7. **Compare documentation vs. implementation**

   * Does the server actually return this structure?
   * Or is it only documented?

8. **Write a short explanation** (4–6 sentences):

   * Which errors you documented
   * When they occur
   * Whether the implementation matches your documentation
   * Why consistent error handling is important

📌 Save your changes in `openapi.yaml` and your notes in `notes.md`.

---

### 💬 Suggested Prompt for AI Support

> **"How do I document error responses in OpenAPI 3.0?"**

Follow-up ideas:

> **"Can you give me examples of common status codes and what they mean?"**
> **"How do I reuse a shared error response using `$ref`?"**

---

### ✅ Checkpoint Review: OPEN-008

📎 Prepare to show:

* At least **3 error responses** (`400`, `404`, `500`)
* Clear descriptions of:

   * when each error occurs
* Optional:

   * reusable `Error` schema
   * reusable responses via `$ref`

And explain:

* Whether your API actually behaves like your documentation
* Why error handling matters for API consumers

**Bonus:**

* Show errors in Swagger UI

✅ If complete → Mark OPEN-008 as **checked off**.

---

### 💡 Optional Challenge

Try:

* Adding `examples` to your error responses
* Using a consistent error format across all endpoints
* Including additional fields (e.g. `timestamp`, `details`)

Or think weiter:

> “Would I understand what went wrong if I only saw this error response?”
