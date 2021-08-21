import {MarkerInfo} from "./info-sidebar/marker-info.class";
import {Feature} from "./feature.class";
import {MarkerInfoComponent} from "./marker-info/marker-info.component";
import {MarkerModel} from './marker-model';

export class Marker {
  private readonly markerID: string;
  private markerInfo: MarkerInfo;
  private representativeProperty: string;
  private searchProperty: string;
  private readonly feature: Feature;
  // private readonly markerModel: MarkerModel;

  private guid(guid: string): GUID {
    return guid as GUID;
  }

  constructor( feature: Feature) {
    // markerModel: MarkerModel) {
    this.markerID = Guid.newGuid();
    this.feature = feature;
    this.markerInfo = this.MarkerInfo;
    this.representativeProperty = this.RepresentativeProperty;
    this.searchProperty = this.SearchProperty;
  }

  get RepresentativeProperty(): string {
    return Object.values(this.feature.Properties).join(', ').toString();
    // return Object.values(this.markerModel).join(', ').toString();
  }

  get SearchProperty(): string {
    return this.representativeProperty.toLowerCase();
  }

  get MarkerInfo(): MarkerInfo {
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
