import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { LoginCommand } from './login.command';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { JwtService } from '../../../infrastructure/security/jwt.service';
import { Email } from '../../../domain/value-objects/email';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<string> {
    const email = new Email(command.email);
    const user = await this.userRepository.findByEmail(email);

    if (!user || !(await user.validatePassword(command.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.updateLastLogin();
    await this.userRepository.save(user);

    return this.jwtService.generateToken({
      sub: user.getId(),
      email: user.getEmail().getValue(),
      roles: user.getRoles(),
    });
  }
} 