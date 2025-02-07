export class Email {
  private readonly value: string;

  constructor(email: string) {
    this.validate(email);
    this.value = email;
  }

  private validate(email: string): void {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Invalid email format');
    }
  }

  public getValue(): string {
    return this.value;
  }
} 