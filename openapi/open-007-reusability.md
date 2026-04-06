## 🧩 OPEN-007 – Reusability with `$ref`

### 🎯 Learning Goal

Understand how OpenAPI enables **reusability** by referencing shared definitions using **`$ref`**.
You should be able to define reusable **schemas**, **parameters**, and **responses** and reuse them across your API.

You should also understand why this improves **maintainability and consistency**.

---

### 📝 Task

1. **Analyze the provided project**

   * Open `openapi.yaml`
   * Identify existing `$ref` usages (e.g. `Todo`, `TodoInput`)
   * Find repeated structures:

      * `id` parameter in multiple endpoints
      * repeated `404` responses
      * repeated schema usage

2. **Identify duplication**
   Ask yourself:

   * Where is the same structure written multiple times?
   * What could be reused instead?

3. **Create reusable components**

   Extend your `components` section:

   #### Parameter example (recommended)

   ```yaml
   components:
     parameters:
       IdParam:
         in: path
         name: id
         required: true
         schema:
           type: string
   ```

   #### Response example (recommended)

   ```yaml
   components:
     responses:
       NotFound:
         description: Resource not found
   ```

4. **Replace inline definitions with `$ref`**

   Example:

   ```yaml
   parameters:
     - $ref: '#/components/parameters/IdParam'
   ```

   ```yaml
   '404':
     $ref: '#/components/responses/NotFound'
   ```

5. **Verify in Swagger UI**

   * Reload Swagger UI
   * Check that everything still works correctly
   * Ensure no errors occur

6. **Write a short explanation** (4–6 sentences):

   * What you refactored into `components`
   * Where you used `$ref`
   * Why this is better than duplication
   * What would happen if you changed the schema in one place

📌 Save your changes in `openapi.yaml` and your notes in `notes.md`.

---

### 💬 Suggested Prompt for AI Support

> **"How does `$ref` work in OpenAPI, and what can I reuse with it?"**

Follow-up ideas:

> **"Can you show me an OpenAPI example where the same parameter is reused across multiple endpoints?"**
> **"What happens if I forget to define a referenced schema or make a typo in the `$ref` path?"**

---

### ✅ Checkpoint Review: OPEN-007

📎 Prepare to show:

* At least **two `$ref` usages** (e.g. parameter + schema)
* One **refactored duplication** (before vs after)
* A clear explanation of:

   * why reusability matters
   * how `$ref` improves maintainability

**Bonus:**

* One reusable response (e.g. shared `404`)

✅ If complete → Mark OPEN-007 as **checked off**.

---

### 💡 Optional Challenge

Try:

* Creating a reusable `Error` response and using it in multiple endpoints
* Reusing query parameters (e.g. `limit`, `offset`)
* Creating a shared `SuccessResponse`

Or think weiter:

> “What happens if I change a schema that is used in 5 endpoints?”

