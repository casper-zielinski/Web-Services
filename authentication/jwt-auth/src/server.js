"use strict";

import express from "express";
import dotenv from "dotenv";
import { authenticate, verify, hashPassword, createToken } from "./auth.js";
import { addUser, getUserById } from "./user.js";
dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;
const app = express();

// Required to parse incoming JSON/form bodies (e.g. from login)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Public route (no authentication required)
 */
app.get("/", (req, res) => {
  res.json({ message: "Hello my friend, Stay awhile and listen..." });
});

/**
 * Login endpoint:
 * Accepts username/password and returns JWT token on success
 */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const token = await authenticate(username, password);
    if (token) {
      return res.json({ token });
    }
  }

  res.status(401).json({ error: "Invalid credentials" });
});

app.post("/register", async (req, res) => {
  const { username, password, fullname, role } = req.body;

  if (username && password && fullname && role) {
    const hashedPassword = hashPassword(password);
    const id = addUser({
      username: username,
      fullname: fullname,
      role: role,
      password: (await hashedPassword).toString(),
    });

    const JWT = createToken(username, hashedPassword, id);
    return res.status(201).json({ message: "User Created", token: JWT });
  }

  return res.status(400).json({ message: "Required fields missing" });
});

/**
 * Protected route:
 * Requires valid JWT token in Authorization header (Bearer)
 */
app.get("/me", verify, (req, res) => {
  const user = getUserById(req.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { password, ...safeUser } = user; // Don't expose password
  res.json(safeUser);
});

app.get("/admin", verify, (req, res) => {
  const user = getUserById(req.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  res.json({ message: "Admin access granted" });
});

// Serve static frontend files (optional frontend integration)
app.use(express.static("public"));

// Start server
app.listen(SERVER_PORT, () => {
  console.log(`✅ Server running at http://localhost:${SERVER_PORT}`);
});
