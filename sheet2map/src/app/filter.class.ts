export class Filter {

  constructor(private category: string,
              private value: string,
              private numberOfMarkers: number) {}

  get Category(): string {
    return this.category;
  }

  set Category(category: string) {
    this.category = category;
  }

  get Value(): string {
    return this.value;
  }

  set Value(value: string) {
    this.value = value;
  }

  get NumberOfMarkers(): number {
    return this.numberOfMarkers;
  }

  set NumberOfMarkers(numberOfMarkers: number) {
    this.numberOfMarkers = numberOfMarkers;
  }
}
