import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;
}

export class ErrorResponse {
  @ApiProperty({
    example: 401,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error type',
  })
  error: string;
}
