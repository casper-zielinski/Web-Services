import crypto from "crypto";
import { getUserByUserName, verifyPassword } from "./user.js";

const USERS = [];

export async function basicAuth(req, res, next) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Basic ")
  ) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  const base64 = req.headers.authorization.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  const [username, password] = decoded.split(":");
  req.username = username;
  const currentUser = getUserByUserName(username);

  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const validPassword = await verifyPassword(
    password,
    currentUser.hash,
    currentUser.salt,
  );

  if (!validPassword) {
    return res.status(401).json({ message: "E-Mail oder Passwort falsch" });
  }
  next();
}
