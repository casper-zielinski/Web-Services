'use strict';

import express from 'express';
import dotenv from 'dotenv';
import { authenticate, verify, USERS } from './auth.js';
dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;
const app = express();

// Required to parse incoming JSON/form bodies (e.g. from login)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Public route (no authentication required)
 */
app.get('/', (req, res) => {
  res.json({ message: 'Hello my friend, Stay awhile and listen...' });
});

/**
 * Login endpoint:
 * Accepts username/password and returns JWT token on success
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const token = await authenticate(username, password);
    if (token) {
      return res.json({ token });
    }
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

/**
 * Protected route:
 * Requires valid JWT token in Authorization header (Bearer)
 */
app.get('/me', verify, (req, res) => {
  const user = USERS.find(u => u.id === req.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password, ...safeUser } = user; // Don't expose password
  res.json(safeUser);
});

// Serve static frontend files (optional frontend integration)
app.use(express.static('public'));

// Start server
app.listen(SERVER_PORT, () => {
  console.log(`✅ Server running at http://localhost:${SERVER_PORT}`);
});
