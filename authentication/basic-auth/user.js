import crypto from "crypto";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);

const USERS = [];

export async function createUser(username, password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  const hash = derivedKey.toString("hex");
  const newUser = { username: username, hash: hash, salt: salt };
  USERS.push(newUser);
  return newUser;
}

export function getUserByUserName(username) {
  const currentUser = USERS.find((user) => user.username === username);
  return currentUser;
}

export async function verifyPassword(inputPassword, storedHash, storedSalt) {
  const derivedKey = await scrypt(inputPassword, storedSalt, 64);
  const currentHash = derivedKey.toString("hex");

  const bufferStored = Buffer.from(storedHash, "hex");
  const bufferCurrent = Buffer.from(currentHash, "hex");

  if (bufferStored.length !== bufferCurrent.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufferStored, bufferCurrent);
}
