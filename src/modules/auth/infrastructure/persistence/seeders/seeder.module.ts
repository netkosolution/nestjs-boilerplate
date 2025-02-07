import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { RoleSeeder } from './role.seeder';
import { PermissionSeeder } from './permission.seeder';
import { AdminUserSeeder } from './admin-user.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeormEntity, Role, Permission]),
  ],
  providers: [RoleSeeder, PermissionSeeder, AdminUserSeeder],
  exports: [RoleSeeder, PermissionSeeder, AdminUserSeeder],
})
export class SeederModule {} 