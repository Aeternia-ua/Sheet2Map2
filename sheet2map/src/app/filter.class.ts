export class Filter {

  constructor(private key: string,
              private value: string) {}

  get Key(): string {
    return this.key;
  }

  get Value(): string {
    return this.value;
  }
}
