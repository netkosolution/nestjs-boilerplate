import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
  findBySocialProvider(provider: string, providerId: string): Promise<User | null>;
} 