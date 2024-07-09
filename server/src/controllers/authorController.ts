import { Request, Response } from 'express';

import AuthorModel from '../models/Author';
import { Params } from '../types/request';
import { Author } from '../types/author';

export const getAllAuthors = async (req: Request<Params>, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const authors = await AuthorModel.getAll(page, pageSize);
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAuthorById = async (req: Request<Params>, res: Response) => {
  try {
    const { resourceId } = req.params;
    const author = await AuthorModel.getById(Number(resourceId));
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve author' });
  }
};

export const createAuthor = async (req: Request<Params>, res: Response) => {
  try {
    const { name, bio, birthdate } = req?.params?.author as Author;
    const newAuthor = await AuthorModel.create({ name, bio, birthdate });
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create author' });
  }
};

export const updateAuthor = async (req: Request<Params>, res: Response) => {
  try {
    const { resourceId } = req.params;
    const { name, bio, birthdate } = req.body;
    const updatedAuthor = await AuthorModel.update(Number(resourceId), {
      name,
      bio,
      birthdate,
    });
    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(updatedAuthor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update author' });
  }
};

export const deleteAuthor = async (req: Request<Params>, res: Response) => {
  try {
    const { resourceId } = req.params;
    await AuthorModel.delete(Number(resourceId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};

export const getBooksByAuthor = async (req: Request<Params>, res: Response) => {
  try {
    const { resourceId } = req.params;
    const books = await AuthorModel.getBooksByAuthor(Number(resourceId));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books by author' });
  }
};
