const WebSocketServer = require("websocket").server;
const http = require("http");
const { htmlEntities, getShuffledColors } = require("./util");
const { WEBSOCKET_SERVER_PORT } = require("./util/config");
const { client } = require("websocket");
const { type } = require("os");

// Define WebSocket origin (used for protocol validation)
const WEBSOCKET_ORIGIN = "msd-webservice";

// Optional: Set process title (visible in system monitoring tools like `ps` or `top`)
process.title = "node-websocket";
const clients = new Map();

const httpServer = http.createServer((req, res) => {
  res.writeHead(501); // 501 = NOT IMPLEMENTED
  res.end();
});

// Start HTTP server to listen for WebSocket connections
httpServer.listen(WEBSOCKET_SERVER_PORT, () => {
  console.log(
    `WebSocket Server running at: ws://localhost:${WEBSOCKET_SERVER_PORT}`,
  );
});

const wsServer = new WebSocketServer({ httpServer });

wsServer.addListener("request", (request) => {
  try {
    console.log(`[INFO] Connection request from origin: ${request.origin}`);
    const connection = request.accept(WEBSOCKET_ORIGIN);
    let clientId = Date.now() + Math.random();
    clients.set(clientId, connection);
    connection.addListener("message", (data) => {
      console.log("message received");
      console.log("pardes JSON Data", JSON.parse(data.utf8Data));
      console.log("data: ", data);
      clients.forEach((client) =>
        client.sendUTF(
          JSON.stringify({ type: "artice", data: JSON.parse(data.utf8Data) }),
        ),
      );
    });
  } catch (error) {
    console.error(`[ERROR] Unexpected server error:`, error);
  }
});
