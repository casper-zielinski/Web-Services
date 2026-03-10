# **WebSocket Backend**

This is the **backend server** for the WebSocket exercise. It runs independently from the frontend and must be started separately.

> **Important:** If you change the WebSocket port in the backend, you must also update the frontend configuration.

## **Prerequisites**
Ensure you have the following installed:

- [Node.js (LTS Version Recommended)](https://nodejs.org/en/)
- A terminal with **basic command-line knowledge**

## **First Steps: Setting Up the Backend**
### **1. Clone the Repository (If Not Already Done)**
```bash
git clone <repository_url>
cd backend
```

### **2. Set Up Environment Variables**
Copy the example environment configuration file and update it if needed:
```bash
cp .env.EXAMPLE .env
```
Modify `.env` as required:
```plaintext
WEBSOCKET_SERVER_PORT=8081
```

### **3. Install Dependencies**
Run the following command in the `backend` directory:
```bash
npm install
```

### **4. Start the WebSocket Server**
```bash
npm start
# or
node server.js
```


## **WebSocket Basics**
This project uses the [`websocket`](https://www.npmjs.com/package/websocket) package to provide WebSocket functionality.

### **Key WebSocket Events in This Server**
| **Event**   | **Description** |
|------------|---------------|
| `open`     | Triggered when a new client connects |
| `message`  | Sent when a client sends data to the server |
| `close`    | Fires when a client disconnects |
| `error`    | Handles WebSocket errors |

**Example WebSocket Client (for Testing)**
```javascript
const ws = new WebSocket("ws://localhost:8081");

ws.onopen = () => console.log("Connected to WebSocket server.");
ws.onmessage = (event) => console.log("Received:", event.data);
ws.onerror = (error) => console.error("WebSocket error:", error);
ws.onclose = () => console.log("Connection closed.");
```

## **Testing and Debugging**
### **Check if the Backend Server is Running**
Run:
```bash
curl -v ws://localhost:8081
```
Expected output:
```
* Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8081
* Sent WebSocket request
```

### **Common Issues and Fixes**
| **Issue**                 | **Possible Cause**                      | **Fix**                                             |
|---------------------------|-----------------------------------------|-----------------------------------------------------|
| Server does not start     | Port already in use                     | Change `WEBSOCKET_SERVER_PORT` in `.env`            |
| Clients do not connect    | Firewall blocking WebSocket connections | Check firewall settings and allow WebSocket traffic |
| Messages are not received | WebSocket not correctly set up          | Check `client.js` and verify `onmessage` handler    |

---

## **Useful Links**
- [MDN WebSockets Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Node.js WebSocket Package](https://www.npmjs.com/package/websocket)

---

## **Final Notes**
- If you change the WebSocket **port**, update it in both **`.env`** and the frontend (`server-port.js`).
- Use multiple browser tabs to **test real-time communication**.
