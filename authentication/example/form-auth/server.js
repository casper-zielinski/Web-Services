'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import { notesRouter } from './notes/notes.js';
import { authorize, checkCredentials } from './authenticate.js';
import { SESSIONS } from './db/sessions.js';

const SERVER_PORT = 3001;

const app = express();
app.use(cookieParser());
// parse urlencoded data from post/get requests
app.use(express.urlencoded({ extended: true }));

// provide static data (index.html) on base route
app.use('/', express.static('public'));

// login
app.post('/login', async (req, res) => {
  if (req.body.username && req.body.password) {
    //check if username and password are given
    const user = await checkCredentials(req.body); // call checkCredentials, we will implement it in a moment!

    if (user) {
      // when we have a valid user, create a new session, we simple create a new uuid as id
      const session_id = uuidv4();
      // add session information to our SESSIONS 'db'
      SESSIONS.push({ user, id: session_id });
      // before we return the response, add a 'session' cookie
      return res
        .cookie('session_id', session_id, {
          httpOnly: true,
          expires: 0,
          sameSite: true,
        })
        .json({
          user,
        });
    }
  }
  res.status(401).json({ error: 'invalid credentials' });
});

app.use('/notes', authorize, notesRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server is up and running on http://localhost:${SERVER_PORT}`);
});
