## 🧩 OPEN-005 – Tools to Test & Visualize OpenAPI

### 🎯 Learning Goal

Get familiar with tools that let you **validate**, **visualize**, and **interact with** your OpenAPI specification.
You should be able to test your defined endpoints in a user-friendly interface and understand how these tools support development workflows.

---

### 📝 Task

1. **Work with the provided project**

   * Start the API:

     ```bash
     npm start
     ```
   * Open Swagger UI:
     👉 [http://localhost:3000/docs](http://localhost:3000/docs)
   * Explore the available endpoints

2. **Use Swagger UI actively**

   * Select one `GET` endpoint (e.g. `/todos`)
   * Select one `POST` endpoint
   * Use **“Try it out”**
   * Execute the request
   * Observe:

      * Request structure
      * Response data
      * Status codes

3. **Choose at least one additional tool**

   #### 🟢 Swagger Editor (Online)

   * [https://editor.swagger.io](https://editor.swagger.io)
   * Paste your `openapi.yaml`
   * Observe validation errors or warnings

   #### 🟢 Postman

   * Import your OpenAPI file
   * Test endpoints using the UI

4. **Compare tools**

   * What is easier in Swagger UI?
   * What is easier in Postman or Swagger Editor?
   * Which tool is better for:

      * Documentation?
      * Testing?
      * Debugging?

5. **Relate to your OpenAPI file**

   * Where do your `summary`, `description`, and `example` values appear?
   * What happens if something is missing or incorrect in the YAML?

6. **Write a short reflection** (4–6 sentences):

   * Which tool you used
   * What worked well
   * What surprised you
   * Which tool you would use in a real project and why

📌 Save your notes in `notes.md`.

---

### 💬 Suggested Prompt for AI Support

> **"What tools can I use to visualize and test my OpenAPI 3.0 specification?"**

Follow-up ideas:

> **"How do I load my OpenAPI YAML into Swagger UI or Postman?"**
> **"Can you help me install Swagger UI locally for my Express project?"**

---

### ✅ Checkpoint Review: OPEN-005

📎 Prepare to demonstrate:

* One tool in action (Swagger UI is required)
* One executed request (`GET` or `POST`)
* Explanation of:

   * what happened during the request
   * how the documentation helped
* One personal takeaway

**Bonus:**

* Show validation feedback from Swagger Editor
* Show import and usage in Postman

✅ If complete → Mark OPEN-005 as **checked off**.

---

### 💡 Optional Challenge

Try:

* Adding or changing an `example` in your schema and observing the effect in Swagger UI
* Breaking your YAML intentionally (e.g. typo) and seeing how tools react
* Switching between servers using the `servers` section

Or:

> “Would I understand this API without Swagger UI – only from code?”