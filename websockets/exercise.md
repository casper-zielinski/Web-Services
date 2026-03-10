# **WebSocket Exercise**

## **Introduction**
In this exercise, you will **implement a WebSocket-based real-time application**. You will start with a **basic WebSocket connection** and progressively extend it by handling **messages, broadcasting events, and user interactions**.

The exercise is divided into **incremental checkpoints**, ensuring you **build up functionality step by step**.

## **Prerequisites**
Before starting, ensure you have:
- **A running WebSocket backend** (`npm run start-backend`)
- **A working frontend setup** (`npm run start-frontend`)
- **A modern web browser** (Chrome, Firefox, Edge, or Safari)
- **Basic understanding of JavaScript and WebSockets**

## **First Steps**
### **1. Start the Backend WebSocket Server**
Run the backend server using:
```bash
npm run start-backend
```
The WebSocket server should now be running at:
```
ws://localhost:8081
```

### **2. Start the Frontend**
Run the frontend server using:
```bash
npm run start-frontend
```
Open [`http://localhost:8000`](http://localhost:8000) in your browser.


## **WebSocket Basics**
WebSockets allow **bi-directional communication** between the client and server. The key events you need to handle are:

| **Event** | **Description**                                                |
|-----------|----------------------------------------------------------------|
| `open`    | Fired when a WebSocket connection is successfully established  |
| `message` | Triggered when a message is received from the WebSocket server |
| `error`   | Called when a WebSocket connection error occurs                |
| `close`   | Fired when the WebSocket connection is closed                  |

### **Example WebSocket Client in the Browser**
You can test WebSocket communication using the browser console:
```javascript
const ws = new WebSocket("ws://localhost:8081");

ws.onopen = () => console.log("Connected to WebSocket server.");
ws.onmessage = (event) => console.log("Received:", event.data);
ws.onerror = (error) => console.error("WebSocket error:", error);
ws.onclose = () => console.log("Connection closed.");
```


## **Exercise Tasks**
Follow the checkpoints in order. Each step builds upon the previous one.

### 🏁 CHECKPOINTS
You will find multiple CHECKPOINTS during this exercise. When you pass a checkpoint, ask your lecturer to review your progress to earn points for grading. In some cases, only a screenshot and a Teams message are necessary to indicate your current state.

### 🟢 CHECKPOINT WS-000: Initial WebSocket Connection & Status Updates (optional)
**Objective**: Establish the foundation for communication and enable status updates.
**Check** `client.js` to:
- Connect to the WebSocket server (`ws://localhost:8081`).
- Send a status message indicating the user is online.
- Display received messages in the console.

**Check** `server.js` to:
- Handle user status messages and broadcast updates.
- Maintain a list of active users.


### 🟢 CHECKPOINT WS-001: Establish a WebSocket Connection 
**Objective**: Go through the Backend and Client WebSocket Example. Identify the following parts and WebSocket functions. Take notes on each feature about the matching function on the server and client side, and add a short description to the table:

| **Program Feature** | **WebSocket Function (EventHandler)** | **Short Description of Behavior** |
|---------------------|--------------------------------------|----------------------------------|
| Receive messages (client) |  |  |
| Receive messages (server) |  |  |
| Send messages (client) |  |  |
| Send messages (server) |  |  |
| New connection (client) |  |  |
| New connection (server) |  |  |

**Check** `client.js` to:
- Connect to the WebSocket server (`ws://localhost:8081`).
- Log `open`, `message`, `error`, and `close` events in the browser console.

**Check** `server.js` to:
- Handle new WebSocket connections and messages.
- Respond to client messages.

**Testing Instructions**:
1. Use at least **two different browsers** and open the WebSocket Client Frontend.
2. Write your **real name** in one browser and a **different name** in the second browser.
3. Send **at least three messages** between both browsers to verify correct WebSocket functionality.

**(Optional Extension)**:
- Modify the WebSocket implementation to **display the current number of connected clients** in the frontend.

🟢 **CHECKPOINT WS-001 Submission**:
- Create a document and add a **screenshot** with the two browser windows side by side.
- Include the **filled table** in the document.
- Indicate your current state within the **Teams call**. 

### Live Ticker Implementation & Checkpoints

The next steps will guide you through implementing a real-time live ticker using WebSockets. A live ticker is a real-time reporting tool used primarily on websites and television broadcasts to provide continuous updates on events as they happen. This tool is widely used for various purposes, including financial markets, sports events, news coverage, and more.

The implementation consists of multiple checkpoints, ensuring a step-by-step progression:

### 🟢 CHECKPOINT WS-002: **Create a Form for a Reporter** 
**Objective**: Implement a reporter interface that allows users to send structured news updates.

**Modify** `reporter.html` to:
- Create a **new webpage** for reporters.
- Add at least **three input fields**:
    - **Title** (max 20 characters)
    - **Topic** (Dropdown selection)
    - **Long-Text** (unlimited theoretical input)
    - *(Optional)* Add an **author name** field.

**Modify** `client.js` to:
- Define a structured **message object** including all form fields.
- Transmit the **entire message object** via WebSocket.
- Output the **submitted message object** in the web console.

**Modify** `server.js` to:
- Set up the WebSocket server to **receive messages** from `reporter.html`.
- Output received messages to the **server console** (no broadcasting yet).

🟢 **CHECKPOINT WS-002 Submission**:
- Create a screenshot with the **web form** and its output in the web console.
- Ensure that the **message object** and **author name** are clearly visible.
- Add the screenshot to the document.

### 🟢 CHECKPOINT WS-003: **Implement the Webserver Part** 
**Objective**: Create a WebSocket Server that can receive messages from `reporter.html`.

**Modify** `server.js` to:
- Implement a WebSocket server that listens for incoming connections.
- Ensure it can receive messages sent from `reporter.html`.
- Output incoming messages to the server console for debugging.
- Remove any unnecessary code to keep the implementation clean.

**Testing Instructions**:
- Open `reporter.html` in a browser.
- Submit at least **two different messages**.
- Verify that the messages appear correctly in the **server console**.

🟢 **CHECKPOINT WS-003 Submission**:
- Create a screenshot showing **the WebSocket server running** and **the web form side by side**.
- Send **at least two different messages** to verify correct functionality.
- Add the screenshot to the document.

### 🟢 CHECKPOINT WS-004: **Add a News Page for Your Users** 
**Objective**: Create a webpage that displays real-time messages sent via WebSocket.

**Modify** `newsreader.html` to:
- Create a headline "Newsreader".
- Establish a WebSocket connection to receive messages.
- Ensure messages sent from `reporter.html` are transmitted through the WebSocket server and received by all connected clients, including `newsreader.html`.
- First, output received messages in the **web console** for debugging.

**Modify** `client.js` to:
- Dynamically create **HTML elements** (`<div>`) for received messages.
- Format received data as:
  ```html
  <div>
    <h2>TOPIC: TITLE</h2>
    <p>LONG-TEXT</p>
  </div>
  ```
  Example:
  ```html
  <div>
    <h2>Breaking News: Successful WebSocket Implemented</h2>
    <p>Students are now able to create WebSocket connections to send and receive messages between clients.</p>
  </div>
  ```

**Modify** `server.js` to:
- Ensure messages sent from `reporter.html` are broadcasted to **all connected clients**.

**Enhancements (Optional):**
- Add new messages **on top** of the news feed.
- Limit displayed news to **the latest 10 messages**.

**Helpful Links:**
- [JS Create Elements](https://developer.mozilla.org/de/docs/Web/API/Document/createElement)
- [JS add DOM Element before another DOM Element](https://www.w3schools.com/jsref/met_node_insertbefore.asp)

🟢 **CHECKPOINT WS-004 Submission**:
- Create a **screenshot** showing the WebSocket server, `reporter.html`, and `newsreader.html` running side by side.
- Send **at least two different messages** and ensure they are received correctly.
- Add the screenshot to the document.

### 🟢 CHECKPOINT WS-005: **Implement a Like Button** 
**Objective**: Enhance user interaction by allowing messages to be liked.
 
**Modify** `newsreader.html` to:
- Extend the `<div>` elements representing news messages with a **Like button**.
- The Like button can initially be a basic HTML `<button>`.

**Modify** `client.js` to:
- Implement a function that triggers when the Like button is clicked.
- Send a **"like" event** over the WebSocket connection, associating it with the corresponding message.
- Ensure that each user can **only like a message once**.

**Modify** `server.js` to:
- Listen for incoming **like events** from clients.
- Maintain a **like counter** for each news item.
- Broadcast **updated like counts** to all connected clients in real time.

**Enhancements (Optional):**
- Store liked messages in a **session or database** to persist like states across page reloads.
- Display a **visual indication** when a user has already liked a message (e.g., a filled heart emoji ❤️).
- Ensure likes are **real-time synced** across multiple clients.

🟢 **CHECKPOINT WS-005 Submission**:
- Create a **screenshot** showing at least **two different users (browsers) liking a message**.
- Include a short description of how the Like button functionality was implemented.
- Add the screenshot to the document.


## **Bonus Tasks (Optional)**
For additional challenges, consider implementing:
- **Message History Persistence**: Store messages in a database (e.g., SQLite, MongoDB).  
- **Private Messages**: Allow users to send direct messages instead of broadcasting.  
- **WebSocket Reconnection**: Automatically reconnect if the connection drops.

## **Troubleshooting & Debugging**
| **Issue**                  | **Possible Cause**                  | **Fix**                                           |
|----------------------------|-------------------------------------|---------------------------------------------------|
| WebSocket does not connect | Backend is not running              | Start it with `npm run start-backend`             |
| Messages are not sent      | WebSocket not correctly initialized | Check `client.js` for WebSocket connection errors |
| Messages are not displayed | Event listener missing              | Ensure `onmessage` is correctly implemented       |

To manually test the WebSocket server:
```bash
curl -v ws://localhost:8081
```


## **References**
- [WebSocket API Reference](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Node.js WebSocket Package](https://www.npmjs.com/package/websocket)
- [Frontend Docs](frontend)
- [Backend Docs](backend)


## **Final Notes**
- Ensure that **both backend and frontend** are running before testing.
- If you change the **WebSocket port**, update `server-port.js` in the frontend.
- Open multiple browser tabs to **simulate multiple clients**.
