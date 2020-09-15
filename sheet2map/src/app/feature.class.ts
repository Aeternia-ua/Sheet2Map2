export class Feature {



  constructor(
    private geometry: any,
    private properties: object,
    private type: string) {
  }

  get Properties(): object {
    return this.properties;
  }

  set Properties(properties: object) {
    this.properties = properties;
  }

  get Geometry(): any {
    return this.geometry;
  }

  set Geometry(geometry: any) {
    this.geometry = geometry;
  }

  get Type(): string {
    return this.type;
  }

  set Type(type: string) {
    this.type = type;
  }

}
