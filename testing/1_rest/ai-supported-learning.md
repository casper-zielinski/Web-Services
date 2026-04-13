# 🤖 AI-Supported Learning - REST Testing (Jest + SuperTest)

In this exercise, you are allowed to use AI tools (e.g., ChatGPT) to support your understanding.

However, AI must be used **to improve your understanding – not to replace it**.


## 🎯 Objective

You will learn:

* how different levels of context influence AI output
* how to evaluate AI-generated code
* how to refine prompts to get better results

---

## 🧪 Task: AI-assisted Test Development

You will use AI in **3 stages** with increasing context.

---

## Step 1 – Minimal Prompt (Low Context)

Start with a very basic prompt:

```
Write a test for a REST API GET endpoint using Jest and SuperTest.
```

### 👉 Your tasks:

* Review the generated code
* Compare it with your existing test setup

### ❓ Questions:

* What is missing compared to your project?
* Does the test fit your `/notes` API?
* Is it directly usable?
* Ask AI for more Details and Explanations.

---

## Step 2 – Improved Prompt (More Context)

Now provide more details:

```
Write a Jest and SuperTest test for a GET /notes endpoint.
The API returns a JSON object with a "notes" array.
Each note has id, title, and description.
```

### 👉 Your tasks:

* Compare this result with Step 1
* Identify improvements

### ❓ Questions:

* What got better?
* Is the structure now closer to your implementation?
* Are assertions more meaningful?

---

## Step 3 – Full Context (Project-Specific)

Now provide context from your actual project:

```
I have an Express app with an in-memory notes storage.
The endpoint GET /notes returns all notes.
Example response:
{
  "notes": [
    { "id": 1, "title": "...", "description": "..." }
  ]
}
Write a proper Jest + SuperTest test for this endpoint.
Use async/await and validate status code and response body.
```

---

### 👉 Your tasks:

* Evaluate the generated test
* Adapt it to your existing test suite

---

## 🧠 Reflection (Mandatory)

Answer the following questions:

1. Which version (Step 1–3) was most useful and why?
2. What did the AI still get wrong or miss?
3. What did you have to manually fix?
4. Would you trust the generated test without reviewing it?

---

## ⚠️ Important Rules

* Do NOT copy AI-generated code without understanding it
* You must be able to explain every line of your test
* AI-generated tests must be adapted to your existing structure
