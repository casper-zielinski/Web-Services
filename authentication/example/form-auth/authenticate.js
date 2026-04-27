'use strict';

import { USERS } from './db/users.js'; // import USERS 'database'
import { SESSIONS } from './db/sessions.js';

/**
 * middlware function to authorize requests
 */
export async function authorize(req, res, next) {
  if (req.cookies) { // first, check if cookies are available
    const activeSession = SESSIONS.find(
      // search for active sessions (we will add new sessions in a moment) and compare it with cookie 'session_id'
      (session) => session.id === req.cookies.session_id
    );
    // when we found a active session, we can continoue
    if (activeSession) {
      return next();
    }
  }
  // when no cookies or active session found, we return a 401 NOT AUTHORIZED back to the client
  return res.status(401).json({ error: 'not authorized' });
}

/**
 * Helper-function to check credentials
 * @param {{username: string, password: string}} credentials get from request
 * @returns {{id: number, username: string, fullname: string} | undefined} user object (without password) when valid user was found
 */
export async function checkCredentials(credentials) {
  // check if user with given username exists
  const user = USERS.find((u) => u.username === credentials.username);

  // when user exists, check if given password is correct
  if (user && user.password === credentials.password) {
    const { password, ...userWithoutPassword } = user; // 'remove' password on object that will returned
    return userWithoutPassword;
  }
  return undefined;
}