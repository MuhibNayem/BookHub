import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBooksByAuthor,
} from '../controllers/bookControllers';
import {
  validateCreateBook,
  validateUpdateBook,
} from '../validators/bookValidator';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateJWT, authorizeRole('author', 'read'), getAllBooks);
router.get(
  '/:id',
  authenticateJWT,
  authorizeRole('author', 'read'),
  getBookById,
);
router.post(
  '/',
  authenticateJWT,
  authorizeRole('author', 'read'),
  validateCreateBook,
  createBook,
);
router.put(
  '/:id',
  authenticateJWT,
  authorizeRole('author', 'read'),
  validateUpdateBook,
  updateBook,
);
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRole('author', 'read'),
  deleteBook,
);
router.get(
  '/author/:id',
  authenticateJWT,
  authorizeRole('author', 'read'),
  getBooksByAuthor,
);

export default router;
