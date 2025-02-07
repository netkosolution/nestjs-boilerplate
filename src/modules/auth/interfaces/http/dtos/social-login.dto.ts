import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class SocialLoginDto {
  @ApiProperty({
    example: 'google-oauth2-token',
    description: 'The OAuth2 token from social provider',
  })
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Token is required' })
  token: string;

  @ApiProperty({
    example: 'google',
    description: 'The social provider name',
    enum: ['google', 'facebook', 'apple', 'twitter'],
  })
  @IsString({ message: 'Provider must be a string' })
  @IsIn(['google', 'facebook', 'apple', 'twitter'], { 
    message: 'Provider must be one of: google, facebook, apple, twitter' 
  })
  @IsNotEmpty({ message: 'Provider is required' })
  provider: string;
} 