'use strict';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Secret used to sign JWTs.
// In production, replace this with a secure environment variable.
const SECRET = process.env.JWT_SECRET || 'TopSecret!';

// Example user database (in-memory)
export const USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'secure', // In optional step: replace with hashed value
    fullname: 'Admin Administrator',
  },
  {
    id: 2,
    username: 'user',
    password: 'keines',
    fullname: 'User Useronimus',
  },
];

/**
 * Authenticate a user.
 * @param {string} username
 * @param {string} password
 * @returns {string|undefined} JWT token if credentials are valid, otherwise undefined
 */
export async function authenticate(username, password) {
  const user = USERS.find(u => u.username === username);

  // In production: use bcrypt.compare instead of plain-text comparison
  if (user && user.password === password) {
    return jwt.sign({ sub: user.id }, SECRET, { expiresIn: 3600 }); // Token valid for 1 hour
  }

  return undefined;
}

/**
 * Middleware to verify JWT from Authorization header.
 * Adds `req.userId` to the request object if valid.
 */
export async function verify(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const [method, token] = authHeader.split(' ');

    if (/^Bearer$/i.test(method) && token) {
      try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = parseInt(decoded.sub); // Make user ID accessible to route handlers
        return next();
      } catch (err) {
        console.error('JWT verification failed:', err.message);
      }
    }
  }

  res.status(401).json({ message: 'You shall not pass!' });
}
