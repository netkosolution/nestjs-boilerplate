import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUserSeeder {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly userRepository: Repository<UserTypeormEntity>,
  ) {}

  async seed(): Promise<void> {
    const adminEmail = 'admin@example.com';
    const existingAdmin = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin123!@#', 10);
      
      await this.userRepository.save({
        email: adminEmail,
        password: hashedPassword,
        name: 'System Admin',
        roles: ['admin'],
        permissions: [
          'user:create',
          'user:read',
          'user:update',
          'user:delete',
          'role:create',
          'role:read',
          'role:update',
          'role:delete',
        ],
        isActive: true,
      });
    }
  }
} 