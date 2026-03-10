# **WebSocket Frontend**

This is the **frontend** for the WebSocket exercise. It provides a simple web-based interface that connects to the WebSocket backend and allows real-time communication.

> **Important:** If the WebSocket server port is changed in the backend, you must also update it in the frontend (`server-port.js`).

---

## **Prerequisites**
Before starting the frontend, ensure you have:

- A **web server** to serve `index.html` (Live Server, Python, Apache, etc.).
- A **working WebSocket backend** running on the correct port.
- A **modern web browser** with JavaScript enabled.

---

## **First Steps: Setting Up the Frontend**
### **1. Clone the Repository (If Not Already Done)**
```bash
git clone <repository_url>
cd frontend
```

### **2. Serve the Frontend**

The frontend consists of static files and requires a local web server.  
Choose one of the following methods:

---

#### **Option 1: Live Server (Recommended for VS Code Users)**

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

#### **Option 2: Python Simple HTTP Server**

Run the following command inside the `frontend` directory:
```bash
python3 -m http.server 8000 --directory .
```
Then, open [`http://localhost:8000`](http://localhost:8000) in your browser.

---

#### **Option 3: Node.js Static Server (New Recommended Option)**

To serve the frontend using Node.js, create a new script `server.js` inside the `frontend` directory:

**`frontend/server.js`**
```javascript
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});
```

**Start the server with:**
```bash
node server.js
```
Then, open [`http://localhost:8000`](http://localhost:8000) in your browser.


#### **Option 4: XAMPP / Apache**

If using **XAMPP** or another local Apache server, place the `frontend` folder inside your web root (`htdocs` for XAMPP) and access it via:
```
http://localhost/frontend/index.html
```


### **Which Option Should You Use?**

| **Method**             | **Best For**                                     |
|------------------------|--------------------------------------------------|
| Live Server (VS Code)  | Quick local development with auto-reload         |
| Python HTTP Server     | Simple static server with no setup               |
| Node.js Express Server | Ideal for Node.js-based development environments |
| XAMPP / Apache         | Suitable for PHP-based or long-term hosting      |


## **Updating the WebSocket Server Port**
If the WebSocket server runs on a different port than **8081**, you must update `server-port.js`.

### **Modify the Port in `server-port.js`**
```javascript
const WS_PORT = 8081; // Change this to match the backend port
const ws = new WebSocket(`ws://localhost:${WS_PORT}`);
```


## **How It Works**
### **Frontend Components**
| **File** | **Description** |
|----------|----------------|
| `index.html` | Main user interface |
| `client.js` | WebSocket logic (connects to the backend) |
| `server-port.js` | Defines the WebSocket port used by the frontend |

### **How WebSocket Communication Works**
1. **Frontend loads and connects to the WebSocket server.**
2. **Users can send messages**, which are forwarded to the backend.
3. **The backend broadcasts received messages** to all connected clients.
4. **Clients dynamically update the message feed** in real time.



## ** Debugging and Troubleshooting**
| **Issue**                      | **Possible Cause**                     | **Fix**                                      |
|--------------------------------|----------------------------------------|----------------------------------------------|
| WebSocket connection fails     | Backend is not running                 | Start the backend with `npm start`           |
| No messages appear in the chat | Frontend is not connected to WebSocket | Check the WebSocket port in `server-port.js` |
| Messages appear delayed        | WebSocket server is overloaded         | Restart the backend and test again           |

### **Testing the WebSocket Connection**
Open the browser console (`F12` -> Console tab) and check for WebSocket logs.

To manually test the WebSocket connection:
```javascript
const ws = new WebSocket("ws://localhost:8081");

ws.onopen = () => console.log("Connected to WebSocket server.");
ws.onmessage = (event) => console.log("Received:", event.data);
ws.onerror = (error) => console.error("WebSocket error:", error);
ws.onclose = () => console.log("Connection closed.");
```

## **Useful Links**
- [MDN WebSockets Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Node.js WebSocket Package](https://www.npmjs.com/package/websocket)
- [Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)


## **Final Notes**
- Ensure the **backend is running before opening the frontend**.
- If the **backend port changes**, update `server-port.js`.
- Use **multiple browser tabs** to test real-time communication.
- Future improvements could include **message history persistence** or **user authentication**.
