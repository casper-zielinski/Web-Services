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

connection.onopen = (ev) => {
  console.log("Opened Web Socket Connection", ev);
};

const like = () => {
  console.log("Like");
};

connection.addEventListener("message", (ev) => {
  console.log("fefever");
  const response = JSON.parse(ev.data);
  const data = response.data;
  articles.push(data);
  articlesDiv.innerHTML = articles.map(
    (val, index) =>
      `<article class="p-2 border border-black m-2 d-flex flex-column" id=${index}><h3 class="m-2 p-2">${val.title}</h3><span>${val.topic}</span><p class="m-2 p-2">${val.longtext}</p><button  onclick="${like}">👍</button></article>`,
  );
});
