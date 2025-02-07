import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserTypeormEntity } from './infrastructure/persistence/entities/user.typeorm.entity';
import { UserTypeormRepository } from './infrastructure/persistence/repositories/user.typeorm.repository';
import { AuthController } from './interfaces/http/controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SocialAuthService } from './services/social-auth.service';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';
import { JwtService } from './infrastructure/security/jwt.service';
import { GoogleAuthService } from './infrastructure/services/google-auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeormEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SocialAuthService,
    GoogleAuthService,
    JwtService,
    JwtStrategy,
    {
      provide: 'IUserRepository',
      useClass: UserTypeormRepository,
    },
  ],
  exports: ['IUserRepository', AuthService],
})
export class AuthModule {} 