import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed(): Promise<void> {
    const roles = [
      {
        name: 'admin',
        description: 'System administrator',
      },
      {
        name: 'user',
        description: 'Regular user',
      },
      {
        name: 'moderator',
        description: 'Content moderator',
      },
    ];

    for (const role of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: role.name },
      });

      if (!existingRole) {
        await this.roleRepository.save(role);
      }
    }
  }
} 