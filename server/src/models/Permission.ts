import { knexInstance } from '../db/knex';
import { Permission } from '../types/permission';

class PermissionModel {
  static async getAll(): Promise<Permission[]> {
    return await knexInstance('permissions').select('*');
  }

  static async findByRoleAndResourceType(
    role: string,
    resourceType: string,
  ): Promise<Permission[]> {
    return await knexInstance('permissions')
      .where({ role, resource_type: resourceType })
      .first();
  }

  static async getByRole(role: string): Promise<Permission[]> {
    return await knexInstance('permissions').where({ role });
  }

  static async create(permission: Permission): Promise<Permission> {
    const [newPermission] = await knexInstance('permissions')
      .insert(permission)
      .returning('*');
    return newPermission;
  }

  static async update(
    id: number,
    permission: Partial<Permission>,
  ): Promise<Permission> {
    const [updatedPermission] = await knexInstance('permissions')
      .where({ id })
      .update(permission)
      .returning('*');
    return updatedPermission;
  }

  static async delete(id: number): Promise<void> {
    await knexInstance('permissions').where({ id }).del();
  }
}

export default PermissionModel;
