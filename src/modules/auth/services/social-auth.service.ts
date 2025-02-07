import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repositories/user.repository.interface';
import { JwtService } from '../infrastructure/security/jwt.service';
import { GoogleAuthService } from '../infrastructure/services/google-auth.service';
import { Email } from '../domain/value-objects/email';
import { User } from '../domain/entities/user.entity';
import { Role } from '../domain/value-objects/role';

@Injectable()
export class SocialAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  async authenticateGoogle(token: string): Promise<string> {
    const googleUser = await this.googleAuthService.verifyToken(token);
    
    let user = await this.userRepository.findBySocialProvider('google', googleUser.id);
    
    if (!user) {
      user = await this.createUserFromGoogle(googleUser);
    }

    user.updateLastLogin();
    await this.userRepository.save(user);

    return this.generateToken(user);
  }

  private async createUserFromGoogle(googleUser: any): Promise<User> {
    const emailVO = new Email(googleUser.email);
    const user = new User(
      crypto.randomUUID(),
      emailVO,
    );

    user.addRole(Role.USER);
    user.activate();
    user.addSocialProvider('google', googleUser.id);

    await this.userRepository.save(user);
    return user;
  }

  private generateToken(user: User): string {
    return this.jwtService.generateToken({
      sub: user.getId(),
      email: user.getEmail().getValue(),
      roles: user.getRoles(),
    });
  }
} 