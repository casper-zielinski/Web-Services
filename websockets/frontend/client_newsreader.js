import { SERVER_PORT } from "./server-port.js";

window.WebSocket = window.WebSocket || window.MozWebSocket;
const articlesDiv = document.getElementById("articles");
let articles = [];

if (!window.WebSocket) {
  alert("Sorry, but your browser does not support WebSockets!");
}

const connection = new WebSocket(
  `ws://127.0.0.1:${SERVER_PORT}`,
  "msd-webservice",
);

// connection.addEventListener("open", () => {
//   alert("Welcome to the news page");
// });

// connection.addEventListener("error", () => {
//   alert("A Error ocured");
// });

connection.addEventListener("message", (ev) => {
  const response = JSON.parse(ev.data);
  const data = response.data;
  articles.push(data);
  articlesDiv.innerHTML = articles.map(
    (val, index) =>
      `<article class="p-2 m-2 d-flex flex-column" id=${index}><h3 class="m-2 p-2">${val.title}</h3><span>${val.topic}</span><p class="m-2 p-2 border-2 border-black">${val.longtext}</p></article>`,
  );
});
