import { body } from 'express-validator';

export const validateCreateAuthor = [
  body('name').notEmpty().withMessage('Name is required'),
  body('birthdate').isDate().withMessage('Birthdate must be a valid date'),
];

export const validateUpdateAuthor = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('birthdate')
    .optional()
    .isDate()
    .withMessage('Birthdate must be a valid date'),
];
