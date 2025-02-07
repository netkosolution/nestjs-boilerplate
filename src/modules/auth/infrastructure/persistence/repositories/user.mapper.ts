import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';
import { Email } from '../../../domain/value-objects/email';

@Injectable()
export class UserMapper {
  toDomain(entity: UserTypeormEntity): User {
    const user = new User(entity.id, new Email(entity.email));
    // Map other properties
    return user;
  }

  toPersistence(domain: User): UserTypeormEntity {
    const entity = new UserTypeormEntity();
    entity.id = domain.getId();
    entity.email = domain.getEmail().getValue();
    // Map other properties
    return entity;
  }
}
