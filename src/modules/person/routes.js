import express from 'express';
import {
  createPerson,
  deletePersonById,
  getPersonById,
  getPersonsWithIndex,
  updatePersonById,
} from './controller.js';

const router = express.Router();

/**
 * Create
 */
router.post('/', createPerson);

/**
 * Retrieve
 */
router.get('/:id', getPersonById);

/**
 * Update
 */
router.put('/:id', updatePersonById);

/**
 * Delete
 */
router.delete('/:id', deletePersonById);

/**
 * Index
 */
router.get('/', getPersonsWithIndex);

export default router;
