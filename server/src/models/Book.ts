import dotenv from 'dotenv';

import { knexInstance } from '../db/knex';
import { Book } from '../types/book';

dotenv.config();

const bookTable = process.env.BOOK_TABLE_NAME ?? 'books';

class BookModel {
  static async getAll(
    page: number = 1,
    pageSize: number = 10,
    searchQuery?: string,
  ): Promise<Book[]> {
    const offset = (page - 1) * pageSize;
    let query = knexInstance(bookTable)
      .select('*')
      .limit(pageSize)
      .offset(offset);

    if (searchQuery) {
      query = query.whereRaw(
        `LOWER(title) LIKE '%${searchQuery.toLowerCase()}%'`,
      );
    }

    return await query;
  }

  static async getById(id: number): Promise<Book | undefined> {
    return await knexInstance(bookTable).where({ id }).first();
  }

  static async create(book: Book): Promise<Book> {
    const [newBook] = await knexInstance(bookTable).insert(book).returning('*');
    return newBook;
  }

  static async update(
    id: number,
    book: Partial<Book>,
  ): Promise<Book | undefined> {
    const [updatedBook] = await knexInstance(bookTable)
      .where({ id })
      .update(book)
      .returning('*');
    return updatedBook;
  }

  static async delete(id: number): Promise<number> {
    return await knexInstance(bookTable).where({ id }).del();
  }

  static async getByAuthor(authorId: number): Promise<Book[]> {
    return await knexInstance(bookTable)
      .where({ author_id: authorId })
      .select('*');
  }
}

export default BookModel;
