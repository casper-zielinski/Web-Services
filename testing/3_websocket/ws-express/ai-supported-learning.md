# 🤖 AI-Supported Learning – WebSocket Testing (ws-express)

In this exercise, you are allowed to use AI tools (e.g., ChatGPT) to support your understanding.

However, AI must be used **to improve your understanding – not to replace it**.

## 🎯 Objective

In this exercise, you will use AI tools (e.g., ChatGPT) to better understand how **WebSocket testing differs from REST testing**, especially regarding:

* asynchronous communication
* persistent connections
* message-based interaction

The goal is not to generate complete solutions, but to:

* explore different approaches
* identify limitations of AI-generated code
* improve your understanding of WebSocket testing

---

## 🧪 Task: AI-assisted WebSocket Test Development

You will work with AI in **three stages**, gradually increasing the level of context.

---

## Step 1 – Minimal Prompt (Low Context)

Start with a very simple prompt:

```
Write a test for a WebSocket server using Jest.
```

### 👉 Your tasks:

* Review the generated test
* Compare it with your existing setup

### ❓ Questions:

* Does the test handle asynchronous behavior correctly?
* Is a connection established?
* Are messages sent and received?
* Ask AI for more Details and Explanations.

---

## Step 2 – Improved Prompt (More Context)

Now provide more details:

```
Write a Jest test for a WebSocket server.
The server accepts connections and sends back the same message (echo).
```

### 👉 Your tasks:

* Compare this result with Step 1
* Identify improvements

### ❓ Questions:

* Does the test now include sending and receiving messages?
* Is the message validation correct?
* Are timing or async issues still present?

---

## 🔹 Step 3 – Full Context (Project-Specific)

Now include details from your actual setup:

```
I have an Express server with a WebSocket (ws) implementation.
When a client connects and sends a message, the server responds with the same message (echo).
Write a Jest test that:
- connects to the WebSocket server
- sends a message
- verifies the response
- properly closes the connection
```

---

### 👉 Your tasks:

* Evaluate the generated test
* Adapt it to your existing test structure

---

## 🧠 Reflection (Mandatory)

Answer the following questions:

1. Which version (Step 1–3) produced the most useful result and why?
2. What did the AI fail to handle correctly (e.g., async behavior, cleanup)?
3. What did you have to fix manually?
4. What problems occur if connections are not properly closed?

---

## ⚠️ Important Rules

* Do NOT copy AI-generated code without understanding it
* You must be able to explain:

    * how the connection is established
    * how messages are handled
    * how asynchronous behavior is controlled
* Always verify that:

    * the test waits for the response correctly
    * connections are properly closed

---

## 💡 Additional Task (Optional)

Ask the AI:

```
Suggest additional test scenarios for a WebSocket server.
```

Then evaluate:

* Which scenarios are relevant for your implementation?
* Which ones are unrealistic or unnecessary?

---

## 🎯 Key Learning Outcome

After completing this task, you should understand that:

* WebSocket testing is fundamentally different from REST testing
* asynchronous communication requires careful handling
* AI-generated code often misses critical aspects like:

    * timing
    * event handling
    * connection lifecycle

👉 AI can support you—but **you must validate and adapt its output** to build correct and reliable tests.
