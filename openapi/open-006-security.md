## 🧩 OPEN-006 – Documenting Security

### 🎯 Learning Goal

Understand how to document **API authentication and authorization** in OpenAPI 3.0.
You should be able to describe simple security mechanisms such as `Bearer Token` or `API Key` and apply them to individual operations or globally.

You should also understand the difference between **documenting security** and **actually implementing it**.

---

### 📝 Task

1. **Understand the current state of the project**

   * Start the API and open Swagger UI
     👉 [http://localhost:3000/docs](http://localhost:3000/docs)
   * Observe:

      * All endpoints are currently **public**
      * No authentication is required

   👉 This means: Security is **not implemented**, but can still be **documented**

2. **Research common API security schemes**

   * `http` → Bearer Token (e.g. JWT)
   * `apiKey` → Header or query parameter
   * (optional) `oauth2`

   Think about:

   * Which approach would make sense for this API?

3. **Add a security definition**

   Extend your `openapi.yaml`:

   ```yaml
   components:
     securitySchemes:
       BearerAuth:
         type: http
         scheme: bearer
         bearerFormat: JWT
   ```

4. **Apply security**

   Choose one approach:

   #### Option A – Global security

   ```yaml
   security:
     - BearerAuth: []
   ```

   #### Option B – Selective security (recommended)

   Protect only write operations:

   ```yaml
   /todos:
     post:
       security:
         - BearerAuth: []

   /todos/{id}:
     put:
       security:
         - BearerAuth: []
     delete:
       security:
         - BearerAuth: []
   ```

5. **Check Swagger UI**

   * Reload Swagger UI
   * Look for the **Authorize button**
   * Try entering a fake token
   * Observe how protected endpoints are marked

6. **Reflect on the difference**

   * Does the API actually block requests without a token?
   * Or is it only documented?

7. **Write a short explanation** (4–6 sentences):

   * Which security method you chose
   * Where you applied it (global vs. selective)
   * Which endpoints are protected
   * What the limitation of this setup is (important!)

📌 Save your changes in `openapi.yaml` and your notes in `notes.md`.

---

### 💬 Suggested Prompt for AI Support

> **"How do I define Bearer Token authentication in OpenAPI 3.0?"**

Follow-up ideas:

> **"What is the difference between `apiKey` and `http` security types?"**
> **"Can you show me an OpenAPI example where only some endpoints require a Bearer token?"**

---

### ✅ Checkpoint Review: OPEN-006

📎 Prepare to show:

* A defined `securityScheme` in `components`
* At least one applied `security` rule
* Swagger UI with visible authentication option

And explain:

* Which endpoints are protected
* Why you chose this approach
* Why the API is still technically **not secured**

**Bonus:**

* Demonstrate selective protection (only POST/PUT/DELETE)

✅ If complete → Mark OPEN-006 as **checked off**.

---

### 💡 Optional Challenge

Try:

* Adding a second security scheme (e.g. `ApiKeyAuth`)
* Combining multiple schemes
* Adding a `description` to your security scheme

Or think weiter:

> “What would I need to change in `server.js` to actually enforce this security?”
