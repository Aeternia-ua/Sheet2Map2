export class Feature {



  constructor(
    private geometry: object,
    private properties: object,
    private type: string) {
  }

  get Properties(): object {
    return this.properties;
  }

  set Properties(properties: object) {
    this.properties = properties;
  }

  get Geometry(): object {
    return this.geometry;
  }

  set Geometry(geometry: object) {
    this.geometry = geometry;
  }

    get Type(): string {
    return this.type;
  }

  set Type(type: string) {
    this.type = type;
  }

}
