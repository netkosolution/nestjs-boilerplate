import * as bcrypt from 'bcrypt';

export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static async create(password: string): Promise<Password> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Password(hashedPassword);
  }

  public async validate(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.value);
  }

  public getValue(): string {
    return this.value;
  }
}
