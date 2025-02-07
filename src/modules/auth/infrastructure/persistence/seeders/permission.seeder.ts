import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionSeeder {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async seed(): Promise<void> {
    const permissions = [
      // User management
      {
        name: 'user:create',
        description: 'Create users',
      },
      {
        name: 'user:read',
        description: 'Read user information',
      },
      {
        name: 'user:update',
        description: 'Update user information',
      },
      {
        name: 'user:delete',
        description: 'Delete users',
      },
      // Role management
      {
        name: 'role:create',
        description: 'Create roles',
      },
      {
        name: 'role:read',
        description: 'Read role information',
      },
      {
        name: 'role:update',
        description: 'Update role information',
      },
      {
        name: 'role:delete',
        description: 'Delete roles',
      },
    ];

    for (const permission of permissions) {
      const existingPermission = await this.permissionRepository.findOne({
        where: { name: permission.name },
      });

      if (!existingPermission) {
        await this.permissionRepository.save(permission);
      }
    }
  }
} 