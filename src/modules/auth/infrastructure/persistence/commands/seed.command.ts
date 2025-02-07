import { Command, CommandRunner } from 'nest-commander';
import { RoleSeeder } from '../seeders/role.seeder';
import { PermissionSeeder } from '../seeders/permission.seeder';
import { AdminUserSeeder } from '../seeders/admin-user.seeder';

@Command({ name: 'seed', description: 'Seed database with initial data' })
export class SeedCommand extends CommandRunner {
  constructor(
    private readonly roleSeeder: RoleSeeder,
    private readonly permissionSeeder: PermissionSeeder,
    private readonly adminUserSeeder: AdminUserSeeder,
  ) {
    super();
  }

  async run(): Promise<void> {
    try {
      console.log('Starting database seeding...');
      
      await this.roleSeeder.seed();
      console.log('✅ Roles seeded');
      
      await this.permissionSeeder.seed();
      console.log('✅ Permissions seeded');
      
      await this.adminUserSeeder.seed();
      console.log('✅ Admin user seeded');
      
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  }
} 