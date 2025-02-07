import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsString, 
  MinLength, 
  IsNotEmpty, 
  Matches,
  MaxLength 
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    minLength: 6,
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    { message: 'Password must contain at least one uppercase letter, one lowercase letter and one number' }
  )
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(
    /^[a-zA-Z\s]*$/,
    { message: 'Name can only contain letters and spaces' }
  )
  name: string;
} 