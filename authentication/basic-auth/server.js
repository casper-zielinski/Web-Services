// server.js
"use strict";

// import the basicAuth middleware for future use
// import { basicAuth } from './basic.js';

import express from "express";
import { basicAuth } from "./middleware.js";
import { createUser } from "./user.js";
const SERVER_PORT = 3000;

const app = express();
app.use(express.json()); 

// Public endpoint – no authentication required
app.get("/notes", (req, res) => {
  res.json([
    {
      id: 1,
      title: "some note",
      description: "this is an example note",
    },
    {
      id: 2,
      title: "other note",
      description: "this is another note",
    },
    // feel free to extend those notes ;)
  ]);
});

// Secure endpoint – should be protected using basicAuth middleware
app.get("/secure", basicAuth, (req, res) => {
  res.json({
    message: "this is a secure message",
  });
});

app.post("/secure", (req, res) => {
  createUser(req.body.username, req.body.password);
  res.json({
    message: "created user",
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`✅ Server is up and running on http://localhost:${SERVER_PORT}`);
});
