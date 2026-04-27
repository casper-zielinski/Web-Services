'use strict';

import { NOTES } from '../db/notes.js';

import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.json(NOTES);
});

export { router as notesRouter };
