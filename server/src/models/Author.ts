import dotenv from 'dotenv';

import { knexInstance } from '../db/knex';
import { Author } from '../types/author';
import { Book } from '../types/book';

dotenv.config();

const bookTable = process.env.BOOK_TABLE_NAME ?? 'books';
const authorTable = process.env.AUTHOR_TABLE_NAME ?? 'authors';

class AuthorModel {
  static async getAll(
    page: number = 1,
    pageSize: number = 10,
    searchQuery?: string,
  ): Promise<Author[]> {
    const offset = (page - 1) * pageSize;
    let query = knexInstance(authorTable)
      .select('*')
      .limit(pageSize)
      .offset(offset);

    if (searchQuery) {
      query = query.whereRaw(
        `LOWER(name) LIKE '%${searchQuery.toLowerCase()}%'`,
      );
    }

    return await query;
  }

  static async getById(id: number): Promise<Author | undefined> {
    return await knexInstance(authorTable).where({ id }).first();
  }

  static async create(author: Author): Promise<Author> {
    const [newAuthor] = await knexInstance(authorTable)
      .insert(author)
      .returning('*');
    return newAuthor;
  }

  static async update(
    id: number,
    author: Partial<Author>,
  ): Promise<Author | undefined> {
    const [updatedAuthor] = await knexInstance(authorTable)
      .where({ id })
      .update(author)
      .returning('*');
    return updatedAuthor;
  }

  static async delete(id: number): Promise<number> {
    return await knexInstance(authorTable).where({ id }).del();
  }

  static async getBooksByAuthor(authorId: number): Promise<Book[]> {
    return await knexInstance(bookTable)
      .where({ author_id: authorId })
      .select('*');
  }
}

export default AuthorModel;
