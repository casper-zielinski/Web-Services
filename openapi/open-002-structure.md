## 🧩 OPEN-002 – Structure of an OpenAPI Specification

### 🎯 Learning Goal

Understand the **overall structure** of an OpenAPI 3.x document and the **role of each main section**.
You should be able to explain the basic layout and navigate an existing `openapi.yaml` file with confidence.

Additionally, you should understand how these sections are used in a **real API example** (this project).

---

### 📝 Task

1. **Use your AI assistant** (e.g. ChatGPT) to explore:

   > “What are the main sections of an OpenAPI 3.x specification – and what is each one used for?”

2. **Identify and describe** the purpose of the following key sections:

   * `openapi`
   * `info`
   * `servers`
   * `paths`
   * `components`
   * `security` (optional)
   * `tags` (optional)
   * `externalDocs` (optional)

3. **Work directly with the provided project**

   * Open the file `openapi.yaml`
   * Compare it with Swagger UI (`http://localhost:3000/docs`)
   * Identify how each section appears in the UI

4. **Locate and mark** these sections in your `openapi.yaml` file and add comments like:

   ```yaml
   info:             # General metadata about the API
   servers:          # Where the API is hosted (dev, prod)
   paths:            # All endpoints and operations
   components:       # Reusable schemas and definitions
   ```

5. **Understand relationships between sections**

   * Where are endpoints defined?
   * Where are data structures defined?
   * How does `paths` reference `components.schemas`?
   * Where would security be added?

6. **Write a short summary** (5–8 sentences) in your notes:

   Your summary should include:

   * A description of at least **4 main sections**
   * An explanation of how **`paths` and `components` work together**
   * A concrete example from this project (e.g. `/todos` endpoint)
   * One observation from Swagger UI (what becomes visible there?)

📌 Save your summary in a file (e.g. `notes.md`) or prepare it for discussion.

---

### 💬 Suggested Prompt for AI Support

> **“Please explain the structure of an OpenAPI 3.0 YAML file. What are the required and optional sections, and what is each one used for?”**

Optional follow-up:

> **“Can you show me a minimal OpenAPI example and walk me through each section?”**

---

### ✅ Checkpoint Review: OPEN-002

📎 Prepare to show the instructor:

* A **marked-up OpenAPI file** where you identified the core sections
* A **short explanation** of what each section is used for
* A clear explanation of how:

   * `paths` define behavior
   * `components` define structure
* A reference to the **To-do API example**

**Bonus:**

* Add a `tags` section or extend it and explain how it affects Swagger UI

✅ If complete → Mark OPEN-002 as **checked off**.

---

### 💡 Optional Challenge

Ask your AI:

> “What would happen if a section like `components` is missing? Can I still define an API?”

Or explore:

> “What is the difference between `components.schemas` and `components.responses`?”

Or praxisnah:

> “Where would I add a new endpoint in this project – and which sections would be affected?”
