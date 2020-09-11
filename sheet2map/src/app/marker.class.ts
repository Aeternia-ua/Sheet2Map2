import {MarkerInfo} from "./info-sidebar/marker-info.class";
import {Feature} from "./feature";
import {MarkerInfoComponent} from "./marker-info/marker-info.component";

export class Marker {
  private markerID: string;
  private markerInfo: MarkerInfo;
  private representativeProperty: string;
  private searchProperty: string;
  private feature: Feature;

  private guid(guid: string): GUID {
    return guid as GUID;
  }

  constructor( feature: Feature) {
    this.markerID = Guid.newGuid();
    this.feature = feature;
    this.markerInfo = this.buildMarkerInfo();
    this.representativeProperty = this.buildRepresentativeProperty();
    this.searchProperty = this.buildSearchProperty();
  }

  private buildRepresentativeProperty(): string {
    return Object.values(this.feature.Properties).join(', ').toString();
  }

  private buildSearchProperty(): string {
    return this.representativeProperty.toLowerCase();
  }

  private buildMarkerInfo(): MarkerInfo {
    return new MarkerInfo(MarkerInfoComponent, {...this.feature.Properties});
  }

  get Feature(): Feature {
    return this.feature;
  }

  get MarkerID(): string {
    return this.markerID;
  }
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
