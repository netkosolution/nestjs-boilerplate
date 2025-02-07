# NestJS Boilerplate - Quick Start for Your API Project

**A feature-rich and production-ready NestJS starter** with built-in enterprise-grade architecture and popular libraries. Supports TypeScript, PostgreSQL/MySQL, TypeORM, JWT Authentication, Docker, and other essential features.

## Features

- 🚀 Built with NestJS 10.x & Node.js 18+
- 📝 TypeScript for type safety and better development experience
- 🏗️ Clean Architecture and Domain-Driven Design principles
- 🔐 JWT Authentication & Role-based Authorization
- 🗃️ TypeORM with PostgreSQL integration
- 📊 Swagger API documentation
- 🔍 Request validation using class-validator
- 🎯 Unit & Integration testing setup with Jest
- 📝 E2E testing with Supertest
- 🔄 CI/CD pipeline with GitHub Actions
- 🐳 Docker & Docker Compose configuration
- 📊 Winston Logger integration
- 🔍 Error handling & logging middleware
- 📧 Mailer service integration
- 🔄 Database migrations and seeders
- 📝 ESLint & Prettier configuration
- 💾 Redis for caching
- 🔄 Bull for queue management
- 📊 Health checks endpoints

## Prerequisites

- Node.js 18+
- PostgreSQL
- Redis
- Docker (optional)

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nestjs-boilerplate.git

# Install dependencies
npm install
```

### Configuration

1. Copy `.env.example` to `.env`
```bash
cp .env.example .env
```

2. Update environment variables in `.env` file

### Running the app

```bash
# Development
npm run start:dev

# Production mode
npm run start:prod

# Using Docker
docker-compose up
```

### Running tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── config/           # Configuration files
├── core/            # Core modules, guards, decorators
├── modules/         # Feature modules
│   ├── auth/       
│   ├── users/      
│   └── ...         
├── shared/          # Shared resources
└── main.ts         # Application entry point
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api/docs
```

## Database Migrations

```bash
# Generate migration
npm run migration:generate -- src/database/migrations/NewMigration

# Run migrations
npm run migration:run

# Revert migrations
npm run migration:revert
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this project useful, please give it a ⭐️ on GitHub!

## Authors

- NETKO Solution

## Acknowledgments

- NestJS Team for the amazing framework
- The open-source community for inspiration and support
