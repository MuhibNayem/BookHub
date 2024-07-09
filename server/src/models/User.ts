import { knexInstance } from '../db/knex';
import bcrypt from 'bcryptjs';

class UserModel {
  static async findByUsername(username: string) {
    return await knexInstance('users').where({ username }).first();
  }

  static async createUser(username: string, password: string, role: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const [user] = await knexInstance('users')
      .insert({ username, password: passwordHash, role })
      .returning('*');
    return user;
  }
}

export default UserModel;
