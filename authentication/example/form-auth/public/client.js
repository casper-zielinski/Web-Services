'use strict';

const loginForm = document.querySelector('form#login');
const usernameSpan = document.querySelector('span.username');
const notesList = document.querySelector('ul#notes');

const noteTemplate = document.querySelector('template#note');

loginForm.addEventListener('submit', async (event) => {
  // we want to use the fetch-API to talk with our 'server', so we prevent the default behaviour of the form-submit
  event.preventDefault();
  const url = event.target.action; // url set in the form-action
  const options = {
    method: event.target.method, // method (post) set in the form-method
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // we will send urlencoded data to the server
    },
    body: urlencodedLoginData(event.target),
  };

  const response = await fetch(url, options); // HTTP Post with our set credentials
  const responseData = await response.json(); // we should get json data back from our server

  if (response.status !== 200 || responseData.error) {
    alert(responseData.error || 'unkonwn error');
    return console.error(responseData.error);
  }
  if (responseData.user) {
    usernameSpan.innerHTML =
      responseData.user.fullname || responseData.user.username || ''; // attach username to header
    event.target.style.display = 'none'; // hide login form
  }
  fetchNotes();
});

/**
 * Function to fetch notes from 'backend' and append them to the side
 */
async function fetchNotes() {
  const url = location.href + 'notes';

  const response = await fetch(url);
  const notes = await response.json();

  // check if we received notes correctly, or some error
  if (!notes || notes.error) {
    return console.error(notes ? notes.error : 'no notes available');
  }
  notes.forEach((note) => {
    const clone = noteTemplate.content.cloneNode(true);
    clone.querySelector('li').textContent = note.description;
    notesList.appendChild(clone);
  });
}

/**
 * Helper function to create www-form-urlencoded data for login
 * @param {HTMLFormElement} form HTML Form, where we have 'username' and 'password' field
 * @returns urlencoded credentials (username=<...>&password=<...>)
 */
function urlencodedLoginData(form) {
  const username = form.querySelector('input[name="username"]');
  const password = form.querySelector('input[name="password"]');

  const data = [];

  if (username) {
    data.push(`username=${username.value}`);
  }
  if (password) {
    data.push(`password=${password.value}`);
  }
  return data.join('&');
}
