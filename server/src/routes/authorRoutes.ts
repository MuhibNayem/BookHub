import express from 'express';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthor,
} from '../controllers/authorController';
import {
  validateCreateAuthor,
  validateUpdateAuthor,
} from '../validators/authorValidator';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.get(
  '/',
  authenticateJWT,
  authorizeRole('author', 'read'),
  getAllAuthors,
);
router.get(
  '/:id',
  authenticateJWT,
  authorizeRole('author', 'read'),
  getAuthorById,
);
router.post(
  '/',
  authenticateJWT,
  authorizeRole('author', 'write'),
  validateCreateAuthor,
  createAuthor,
);
router.put(
  '/:id',
  authenticateJWT,
  authorizeRole('author', 'write'),
  validateUpdateAuthor,
  updateAuthor,
);
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRole('author', 'write'),
  deleteAuthor,
);
router.get(
  '/:id/books',
  authenticateJWT,
  authorizeRole('books', 'read'),
  getBooksByAuthor,
);

export default router;
