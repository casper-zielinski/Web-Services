## 🧩 OPEN-004 – Understanding Schemas

### 🎯 Learning Goal

Understand the purpose of **schemas** in OpenAPI – especially how they define **data models** and enable **reusability** through `$ref`.

You should be able to:

* Create and extend `components.schemas`
* Reference schemas in endpoints
* Understand how schemas relate to real API responses

---

### 📝 Task

1. **Work with the provided project**

   * Open `openapi.yaml`
   * Locate the existing schemas (e.g. `Todo`, `TodoInput`)
   * Compare them with real responses in Swagger UI
     👉 [http://localhost:3000/docs](http://localhost:3000/docs)

2. **Understand existing schemas**

   * What properties does a `Todo` have?
   * Which fields are required?
   * What is the difference between `Todo` and `TodoInput`?
   * Where are these schemas used in `paths`?

3. **Create or extend a schema**

   Choose one of the following:

   * Extend the existing `Todo` schema (e.g. add `createdAt`, `priority`)
   * Create a new schema (e.g. `Category`, `User`, `Tag`)

   Your schema should:

   * Use `type: object`
   * Contain at least **3 properties**
   * Include `type` and `example` for each property
   * Define at least **one required field**
   * Optionally include `description`

4. **Use your schema in an endpoint**

   * Reference it using `$ref`
   * Example:

     ```yaml
     $ref: '#/components/schemas/YourSchema'
     ```
   * Integrate it into:

      * a response (`200`, `201`)
      * or a request body

5. **Check Swagger UI**

   * Reload Swagger UI
   * Verify how your schema is displayed
   * Check if examples appear correctly

6. **Write a short explanation** (4–6 sentences):

   * What your schema represents
   * Why you structured it that way
   * Where it is used in your API
   * Why `$ref` is better than repeating the structure inline

📌 Save your schema in `openapi.yaml` and your notes in `notes.md`.

---

### 🧪 Example Schema

```yaml
components:
  schemas:
    Note:
      type: object
      required:
        - title
      properties:
        id:
          type: string
          example: "abc123"
        title:
          type: string
          example: "Lecture notes"
        content:
          type: string
          example: "This is a note."
```

Usage:

```yaml
schema:
  $ref: '#/components/schemas/Note'
```

---

### 💬 Suggested Prompt for AI Support

> **"What is the purpose of `components.schemas` in OpenAPI 3.0?"**

Follow-up ideas:

> **"Can you help me create a schema for a blog post with title, content, tags, and author?"**
> **"How do I mark a property as required in OpenAPI – and what happens if I don't?"**

---

### ✅ Checkpoint Review: OPEN-004

📎 Prepare to demonstrate:

* One **extended or newly created schema**
* At least one **endpoint using `$ref`**
* A clear explanation of:

   * what the schema represents
   * where it is used
   * why it is defined in `components` instead of inline

**Bonus:**

* Show how your schema appears in Swagger UI

✅ If complete → Mark OPEN-004 as **checked off**.

---

### 💡 Optional Challenge

Ask your AI assistant:

> **"What are the benefits and drawbacks of using `$ref` vs inline definitions?"**
> **"Can I reuse a schema for both input and output? How would I model differences between them?"**

Try also:

* Creating a schema with nested objects (e.g. `author` inside `Post`)
* Using arrays (e.g. list of tags)
* Adding descriptions for better documentation
