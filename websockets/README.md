# **WebSocket Example**

## Goal of this Exercise
After completing this exercise you should be able to:

- understand how WebSocket connections work
- establish WebSocket connections in the browser
- implement WebSocket event handling
- send and receive messages between client and server
- build a simple real-time application

## **Introduction to WebSockets**

### **What Are WebSockets?**
WebSockets provide a **persistent, full-duplex communication channel** between a client and a server over a single connection. Unlike traditional HTTP, where the client must repeatedly send requests to get updates (polling), WebSockets allow the server to **push data in real-time** as soon as an event occurs.

### **How WebSockets Differ from HTTP**
| **Feature**       | **HTTP (REST API)**                 | **WebSockets**                        |
|-------------------|-------------------------------------|---------------------------------------|
| **Communication** | Request-Response                    | Full-duplex, bi-directional           |
| **Connection**    | New connection per request          | Persistent connection                 |
| **Latency**       | Higher due to repeated requests     | Lower due to continuous communication |
| **Best For**      | Standard APIs, fetching static data | Real-time updates, chat, live feeds   |

### **When to Use WebSockets?**
WebSockets are ideal when **low-latency, real-time communication** is required, such as:
- **Live chat applications**
- **Financial stock tickers**
- **Real-time notifications**
- **Multiplayer online games**
- **Live sports updates and news tickers**

### **How WebSockets Work – A Basic Flow**
1. **Client initiates a WebSocket connection** using `ws://` (or `wss://` for secure connections).
2. **Server accepts the WebSocket handshake** and keeps the connection open.
3. **Data can be sent by both the client and the server** at any time.
4. **The connection remains open until** either the client or the server closes it.

This exercise will guide you through **setting up a WebSocket server, handling messages, and integrating a live ticker for real-time updates.** You will also implement client-side WebSocket handling to receive and display data dynamically.

### WebSocket Architecture Overview

In this example the communication between the components looks as follows:
```
Browser (Frontend)
│
│ WebSocket connection (ws://localhost:8081)
│
▼
WebSocket Server (Node.js)
│
│ Message processing
│
▼
Application logic
```
The browser establishes a persistent WebSocket connection to the backend server.  
Once the connection is established, both sides can send messages at any time.

This is different from REST APIs, where every interaction requires a new HTTP request.

## **About the Exercise**
The (early) basics are derived from another course:  
🔗 <https://github.com/michaelulm/distributed-computing/tree/master/websocket/chat>

For this exercise, we provide two parts and improved detailed instructions:
- 🖥️ **[Backend](backend)**: Node.js-based WebSocket server.
- 🌐 **[Frontend](frontend)**: User interface to interact with the WebSocket service.

Please carefully read the **README files in each directory** and follow the [exercise instructions](exercise.md) after successfully setting up and running the WebSocket example.


## **Prerequisites**
Ensure you have the following installed before proceeding:

- **[Node.js](https://nodejs.org/en/)** (for the [backend](backend))
  - We recommend the latest **[LTS version](https://nodejs.org/dist/latest-v24.x/)**.
- **A local running webserver** for the frontend:
  - **Recommended:** [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for **VS Code**.
  - **Currently Integrated:** Node.js Express Server with concurrently starting scripts.
  - **Alternative:** Built-in web server in **WebStorm/IntelliJ**.
  - **Other options:**
    - [XAMPP](https://www.apachefriends.org/index.html) for Apache-based hosting.
    - Simple **Python-based HTTP server** *(for testing only)*:
      ```bash
      python3 -m http.server 8000 --directory ./frontend
      ```


## **First Steps: Running the WebSocket Example**

### **1. Clone the Repository**
```bash
git clone <repository_url>
cd websocket
```

### **2. Install Dependencies**
Run the following command from the **root directory** to install dependencies for both `backend` and `frontend`:
```bash
npm run install-all
```

### **3. Start Backend and Frontend**
You can start the backend and frontend **separately** or **together**.

#### **Option 1: Start Both Backend & Frontend Simultaneously**
```bash
npm run start-all
```
This runs both:
- **Backend WebSocket Server** on `ws://localhost:8081`
- **Frontend Static Server** on `http://localhost:8000`

#### **Option 2: Start Backend Only**
```bash
npm run start-backend
```

#### **Option 3: Start Frontend Only**
```bash
npm run start-frontend
```


## **WebSocket Events**
WebSockets use **four main events** to communicate between the **client** and the **server**.

| **Event** | **Description**                                            |
|-----------|------------------------------------------------------------|
| `open`    | Triggered when the connection is successfully established  |
| `message` | Fired when a message is received from the server or client |
| `error`   | Called when an error occurs in the WebSocket connection    |
| `close`   | Triggered when the connection is closed                    |

### Typical Communication Flow

A typical WebSocket interaction works as follows:

1. The client establishes a connection to the server.
2. The server accepts the connection.
3. The client sends a message.
4. The server processes the message.
5. The server may broadcast the message to other connected clients.

Example:

Client A sends:
```
{ "type": "message", "text": "Hello" }
```
Server receives the message and forwards it to all connected clients.

Client B receives:

```
{ "type": "message", "text": "Hello", "author": "Client A" }
```

### **Example: WebSocket Client in the Browser**
To test the WebSocket connection, open the browser console (`F12` -> Console tab) and run:
```javascript
const ws = new WebSocket("ws://localhost:8081");

ws.onopen = () => console.log("Connected to WebSocket server.");
ws.onmessage = (event) => console.log("Received:", event.data);
ws.onerror = (error) => console.error("WebSocket error:", error);
ws.onclose = () => console.log("Connection closed.");
```

### WebSocket Message Format

WebSockets transmit messages as raw data.  
In many applications messages are structured using JSON.

Example message:

```json
{
  "type": "chat",
  "user": "Alice",
  "message": "Hello world"
}
```
Using structured messages makes it easier to implement different message types such as:

- chat messages
- system notifications
- updates
- commands

### REST vs WebSocket

In previous exercises you implemented REST APIs.  
WebSockets follow a different communication model.

| Feature | REST API | WebSocket |
|-------|-------|-------|
| Communication | Request / Response | Full duplex |
| Connection | Short lived | Persistent |
| Data Flow | Client initiates | Client and server |
| Latency | Higher | Lower |
| Use Cases | CRUD APIs | Real-time communication |

REST is ideal for retrieving and updating data.  
WebSockets are ideal for applications where **data changes frequently and must be pushed to clients immediately**.

## Debugging Tips

When working with WebSockets it is useful to inspect the connection in the browser.

Open the browser developer tools:

F12 → Network → Filter WS → Tab Response

There you can see:

- the WebSocket connection
- messages sent by the client
- messages received from the server

This helps to debug communication problems between frontend and backend.

## **Troubleshooting**
| **Issue**                          | **Possible Cause**                     | **Fix**                                        |
|------------------------------------|----------------------------------------|------------------------------------------------|
| WebSocket connection fails         | Backend is not running                 | Start the backend with `npm run start-backend` |
| No messages appear in the frontend | Frontend is not connected to WebSocket | Check the WebSocket port in `server-port.js`   |
| Messages appear delayed            | WebSocket server is overloaded         | Restart the backend and test again             |
| Cannot access frontend             | No web server is running               | Run `npm run start-frontend`                   |
| WebSocket closes immediately       | Server rejected connection             | Check server logs                              |
| CORS related errors                | Wrong origin settings                  | Check server configuration                     |
| Connection stuck in CONNECTING     | Server not reachable                   | Verify correct port                            |

To test a WebSocket connection you cannot use curl directly, because curl only supports HTTP.

Instead you can use tools like:

- browser developer tools
- WebSocket testing tools
- Node.js scripts
- extensions such as "WebSocket King" or "Simple WebSocket Client"

Alternatively you can test the connection directly in the browser console:

```javascript
const ws = new WebSocket("ws://localhost:8081");

ws.onopen = () => console.log("Connected");
ws.onmessage = (event) => console.log(event.data);
```

## Discussion

Think about the following question:

- Would you implement a blog website using WebSockets?
- Why or why not?
- Discuss which applications benefit from WebSockets and which are better suited for REST APIs.

## References
- [WebSocket API Reference](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Node.js WebSocket Package](https://www.npmjs.com/package/websocket)
- [Express.js Documentation](https://expressjs.com/)


## Final Notes
- **Ensure the backend is running before opening the frontend**.
- **If the backend WebSocket port changes, update it in `frontend/server-port.js`**.
- **Use multiple browser tabs** to test real-time communication.
- **Future Enhancements:** Consider adding **message history persistence**, **authentication**, or **scalability improvements**.

