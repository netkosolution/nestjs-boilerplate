export class Email {
  constructor(private readonly value: string) {
    // Add email validation logic here
  }

  toString(): string {
    return this.value;
  }
}
