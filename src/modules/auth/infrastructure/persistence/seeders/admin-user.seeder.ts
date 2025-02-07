import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../entities/role.entity';
import { Email } from '../../../domain/value-objects/email';

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
        isActive: true,
        roles: [],
      });
    }
  }
}
