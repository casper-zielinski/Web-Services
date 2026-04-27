'use strict';

const authForm = document.querySelector('form#auth');
const msgForm = document.querySelector('form#msg');
const outputList = document.querySelector('ul#output');
const userSpan = document.querySelector('span#user');

const msgTemplate = document.querySelector('template#message');

window.WebSocket = window.WebSocket || window.MozWebSocket;

/**
 * Check if websocket is available
 */
if (!window.WebSocket) {
  appendWarning(`Sorry, but your browser doesn't support WebSocket!`);
  throw new Error('no Websocket support available');
} else {
}

const connection = new WebSocket(
  `ws://${window.location.host}`,
  'msd-webservice'
);

connection.onopen = () => {
  console.log('connected...');
  authForm.style.display = 'block';
  msgForm.style.display = 'none';
};

connection.onclose = () => {
  console.log('closed...');
  authForm.style.display = 'none';
  msgForm.style.display = 'none';
};

connection.onerror = (error) => {
  console.error('error...', error);
  appendWarning(error.message || error);
};

connection.onmessage = (message) => {
  let json;
  try {
    json = JSON.parse(message.data); // parse json message from server
  } catch (err) {
    console.error('error parsing message', err);
    appendWarning('invalid message from server');
  }

  switch (json.type) {
    case 'authenticate': // type authenticate should have a 'success' field (boolean) and a 'user' field
      authForm.style.display = json.success ? 'none' : 'block';
      msgForm.style.display = json.success ? 'block' : 'none';
      if (json.success && json.user) {
        console.log('successfully logged in');
        userSpan.innerText =
          json.user.fullname ||
          authForm.querySelector('input[name="username"]').value ||
          '';
        appendSuccess(`logged in as ${json.user.fullname}`);
      } else {
        console.error('could not log in');
        appendWarning('invalid credentials');
      }
      break;
    case 'msg': // type msg should have a 'message' field (string)
      appendMessage(json.message);
      break;
    default:
      console.error(`unknown type [${json.type}]`, json);
  }
};

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = authForm.querySelector('input[name="username"]').value;
  const password = authForm.querySelector('input[name="password"]').value;

  connection.send( // send username and password to server
    JSON.stringify({
      type: 'authenticate',
      data: { username, password },
    })
  );
});

msgForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const $msg = msgForm.querySelector('input[name="message"]');
  const msg = $msg.value;
  if (!msg) {
    return;
  }

  // send message to server
  connection.send(JSON.stringify({ type: 'msg', data: msg }));
  $msg.value = '';
  $msg.focus();
});

/**
 * Helper-Function to add 'warnings' to outputList
 * @param {string} txt should be output as warning
 */
function appendWarning(txt) {
  appendMessage(txt, 'list-group-item-warning');
}

/**
 * Helper-Function to add 'success' to outputList
 * @param {string} txt should be output as success
 */
function appendSuccess(txt) {
  appendMessage(txt, 'list-group-item-success');
}

/**
 * Helper-Function to add 'messges' to outputList
 * @param {string} txt should be added to output
 */
function appendMessage(txt, type = 'default') {
  const clone = msgTemplate.content.cloneNode(true);
  clone.querySelector('li').classList.add(type);
  clone.querySelector(
    'li'
  ).textContent = `${new Date().toLocaleTimeString()}: ${txt}`;
  outputList.appendChild(clone);
}
