import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email';
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
    const entity = await this.repository.findOne({
      where: { email: email.getValue() },
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async save(user: User): Promise<void> {
    const entity = this.mapper.toPersistence(user);
    await this.repository.save(entity);
  }

  async findBySocialProvider(
    provider: string,
    providerId: string,
  ): Promise<User | null> {
    const entity = await this.repository
      .createQueryBuilder('user')
      .where(`user.social_providers ->> :provider = :providerId`, {
        provider,
        providerId,
      })
      .getOne();

    return entity ? this.mapper.toDomain(entity) : null;
  }
} 