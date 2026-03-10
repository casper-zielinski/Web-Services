import { SERVER_PORT } from "./server-port.js";

const titleInput = document.getElementById("title");
const topicSelector = document.getElementById("topic");
const longtextInput = document.getElementById("long-text");
const form = document.getElementById("submit-form");
let title = titleInput.value;
let topic = topicSelector.value;
let longtext = longtextInput.value;

window.WebSocket = window.WebSocket || window.MozWebSocket;

if (!window.WebSocket) {
  alert("Sorry, but your browser does not support WebSockets!");
}

const connection = new WebSocket(
  `ws://127.0.0.1:${SERVER_PORT}`,
  "msd-webservice",
);

// connection.addEventListener("error", () => {
//   alert("A Error ocured");
// });

// connection.addEventListener("open", () => {
//   alert("Welcome to Forum Page");
// });

const message = {
  title: title,
  topic: topic,
  longtext: longtext,
};

titleInput.addEventListener("change", (e) => {
  message.title = e.target.value;
});

topicSelector.addEventListener("change", (e) => {
  message.topic = e.target.value;
});

longtextInput.addEventListener("change", (e) => {
  message.longtext = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  connection.send(JSON.stringify(message));
});
