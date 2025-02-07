import { AggregateRoot } from '@nestjs/cqrs';
import { Role } from '../value-objects/role';
import { Email } from '../value-objects/email';
import { Password } from '../value-objects/password';

export class User extends AggregateRoot {
  private readonly id: string;
  private email: Email;
  private password: Password;
  private roles: Role[];
  private permissions: string[];
  private isActive: boolean;
  private lastLoginAt?: Date;
  private socialProviders: Map<string, string>;
  private name: string;

  constructor(id: string, email: Email) {
    super();
    this.id = id;
    this.email = email;
    this.roles = [];
    this.permissions = [];
    this.isActive = false;
    this.socialProviders = new Map();
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): Email {
    return this.email;
  }

  public addRole(role: Role): void {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  public hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  public addSocialProvider(provider: string, providerId: string): void {
    this.socialProviders.set(provider, providerId);
  }

  public activate(): void {
    this.isActive = true;
  }

  public deactivate(): void {
    this.isActive = false;
  }

  public updateLastLogin(): void {
    this.lastLoginAt = new Date();
  }

  public async validatePassword(password: string): Promise<boolean> {
    return this.password.validate(password);
  }

  public getRoles(): string[] {
    return this.roles.map(role => role.toString());
  }

  public setPassword(password: Password): void {
    this.password = password;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
