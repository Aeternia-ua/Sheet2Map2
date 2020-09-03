export class Feature {

  private geometry: object;
  private properties: object;
  // private type: string;

  constructor() {
  }

  get Properties(): object {
    return this.properties;
  }

  set Properties (properties: object) {
    this.properties = properties;
  }

  get Geometry (): object {
    return this.geometry;
  }

}
