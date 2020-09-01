import { Injectable } from '@angular/core';
import {JsonService} from "./json.service";
import {Guid, GUID, Marker} from "../marker";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  public markers: any;

  constructor(private jsonService: JsonService) { }

  createMarkers(): Observable<any[]> {
    this.markers = [];
    // Get features from Json feature collection
      this.jsonService.getFeatures().subscribe((features: any) => {
        for (const feature of features) {
          let marker = new Marker(this.guid(Guid.newGuid()), feature);
          this.markers.push(marker);
        }
      })
    // console.log('this marks ', this.markers);
      // Return observable
    return of(this.markers);
  }
  private guid(guid: string) : GUID {
    return guid as GUID;
  }
}
