import { body } from 'express-validator';

export const validateCreateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('published_date')
    .isDate()
    .withMessage('Published date must be a valid date'),
  body('author_id').isInt().withMessage('Author ID must be a valid integer'),
];

export const validateUpdateBook = [
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('published_date')
    .optional()
    .isDate()
    .withMessage('Published date must be a valid date'),
  body('author_id')
    .optional()
    .isInt()
    .withMessage('Author ID must be a valid integer'),
];
