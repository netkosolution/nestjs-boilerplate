import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserTypeormRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly repository: Repository<UserTypeormEntity>,
    private readonly mapper: UserMapper,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { id } });
    return userEntity ? this.mapper.toDomain(userEntity) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { email: email.getValue() },
    });
    return userEntity ? this.mapper.toDomain(userEntity) : null;
  }

  async save(user: User): Promise<void> {
    const persistenceEntity = this.mapper.toPersistence(user);
    await this.repository.save(persistenceEntity);
  }

  async findBySocialProvider(
    provider: string,
    providerId: string,
  ): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: `socialProviders->>'${provider}' = :providerId`,
      parameters: { providerId },
    });
    return userEntity ? this.mapper.toDomain(userEntity) : null;
  }
} 