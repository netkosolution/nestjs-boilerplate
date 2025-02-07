import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../domain/repositories/user.repository.interface';
import { JwtService } from '../infrastructure/security/jwt.service';
import { Email } from '../domain/value-objects/email';
import { Password } from '../domain/value-objects/password';
import { User } from '../domain/entities/user.entity';
import { Role } from '../domain/value-objects/role';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const emailVO = new Email(email);
    const user = await this.userRepository.findByEmail(emailVO);

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.updateLastLogin();
    await this.userRepository.save(user);

    return this.generateToken(user);
  }

  async register(email: string, password: string, name: string): Promise<string> {
    const emailVO = new Email(email);
    const existingUser = await this.userRepository.findByEmail(emailVO);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordVO = await Password.create(password);
    const user = new User(
      crypto.randomUUID(),
      emailVO,
    );
    user.setPassword(passwordVO);
    user.setName(name);
    
    user.addRole(Role.USER);
    user.activate();
    
    await this.userRepository.save(user);
    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    return this.jwtService.generateToken({
      sub: user.getId(),
      email: user.getEmail().getValue(),
      roles: user.getRoles(),
    });
  }
} 