import { Injectable } from '@angular/core';
import {JsonService} from "./json.service";
import {Guid, GUID, Marker} from "../marker";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {MarkerInfo} from "../info-sidebar/info-item";
import {MarkerInfoComponent} from "../marker-info/marker-info.component";
import {Memoize} from "typescript-memoize";
import {Markers} from "../markers";
import {Feature} from "../feature";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  // public markers: any[];
  markers: Observable<any[]>;

  constructor(private jsonService: JsonService) { }

  // TODO: Return an immutable object
    createMarkers(): Observable<any[]> {
    // Get features from Json feature collection
    return this.jsonService.getJson().pipe(map(source => {
        const markers = [];
        const features = source['features'];
        for (let feature of features) {
          let newFeature = new Feature();
          newFeature.Properties = feature.properties;
          let marker = new Marker(newFeature);
          // console.log('markerService marker ', marker);
          markers.push(marker);
        }
        console.log('marker [0] from marker service ', markers[0], markers[0].id);
        return markers;
    }));
  }
  private guid(guid: string) : GUID {
    return guid as GUID;
  }
  getMarkers(): Observable<any[]> {
    return this.markers = this.createMarkers();
  }
}
