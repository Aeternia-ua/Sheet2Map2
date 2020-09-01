export class Marker {
  constructor(public id: GUID,
              public feature: any) {}
}

export type GUID = string & {
  isGuid: true
};

// Testing generating guid
export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
