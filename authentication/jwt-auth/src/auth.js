"use strict";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getUserById, addUser, getUsers } from "./user.js";
dotenv.config();

// Secret used to sign JWTs.
// In production, replace this with a secure environment variable.
const SECRET = process.env.JWT_SECRET || "TopSecret!";
const experationDuration = 3600;

// Example user database (in-memory)
export function createToken(username, password, id) {
  const user = getUserById(id);

  if (user) {
    return jwt.sign({ sub: id }, SECRET, { expiresIn: experationDuration });
  }

  return undefined;
}

/**
 * Authenticate a user.
 * @param {string} username
 * @param {string} password
 * @returns {string|undefined} JWT token if credentials are valid, otherwise undefined
 */
export async function authenticate(username, password) {
  const user = getUsers().find((u) => u.username === username);

  // In production: use bcrypt.compare instead of plain-text comparison
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ sub: user.id }, SECRET, {
      expiresIn: experationDuration,
    }); // Token valid for 1 hour
  }

  return undefined;
}

/**
 * Middleware to verify JWT from Authorization header.
 * Adds `req.userId` to the request object if valid.
 */
export async function verify(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  const [method, token] = authHeader.split(" ");

  if (/^Bearer$/i.test(method) && token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      req.userId = parseInt(decoded.sub); // Make user ID accessible to route handlers
      return next();
    } catch (err) {
      console.error("JWT verification failed:", err.message);
    }
  } else {
    return res.status(401).json({ error: "Invalid Authorization format" });
  }
}

export async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}
