// server.js
'use strict';

// import the basicAuth middleware for future use
// import { basicAuth } from './basic.js';

import express from 'express';
const SERVER_PORT = 3000;

const app = express();

// Public endpoint – no authentication required
app.get('/notes', (req, res) => {
  res.json([
    {
      id: 1,
      title: "some note",
      description: "this is an example note"
    },
    {
      id: 2,
      title: "other note",
      description: "this is another note"
    }
    // feel free to extend those notes ;)
  ]);
});

// Secure endpoint – should be protected using basicAuth middleware
app.get('/secure', (req, res) => {
  res.json({
    message: "this is a secure message"
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`✅ Server is up and running on http://localhost:${SERVER_PORT}`);
});
