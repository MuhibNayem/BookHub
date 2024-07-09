import { Request, Response } from 'express';

import BookModel from '../models/Book';
import { Params } from '../types/request';

export const getAllBooks = async (req: Request<Params>, res: Response) => {
  const { query: searchQuery, page, pageSize } = req.query;
  const pageNumber = parseInt(page as string) || 1;
  const size = parseInt(pageSize as string) || 10;

  try {
    const books = await BookModel.getAll(
      pageNumber,
      size,
      searchQuery as string,
    );
    res.status(200).json(books);
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getBookById = async (req: Request<Params>, res: Response) => {
  try {
    const { resourceId } = req.params;
    const book = await BookModel.getById(Number(resourceId));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

export const createBook = async (req: Request<Params>, res: Response) => {
  try {
    const { title, description, published_date, author_id } = req.body;
    const newBook = await BookModel.create({
      title,
      description,
      published_date,
      author_id,
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

export const updateBook = async (req: Request<Params>, res: Response) => {
  try {
    const { resourceId } = req.params;
    const { title, description, published_date, author_id } = req.body;
    const updatedBook = await BookModel.update(Number(resourceId), {
      title,
      description,
      published_date,
      author_id,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(202).json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

export const deleteBook = async (req: Request<Params>, res: Response) => {
  try {
    const { resourceId } = req.params;
    await BookModel.delete(Number(resourceId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

export const getBooksByAuthor = async (req: Request<Params>, res: Response) => {
  try {
    const { resourceId } = req.params;
    const books = await BookModel.getByAuthor(Number(resourceId));
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books by author' });
  }
};
