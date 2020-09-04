import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Globals} from "../globals";
import {Observable, of} from "rxjs";
import {MarkerInfo} from "../info-sidebar/info-item";
import {MarkerInfoComponent} from "../marker-info/marker-info.component";

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private sourceUrl = Globals.dataURL;
  private features: object;
  private json;
  private properties: any;

  constructor(private http: HttpClient) {
  }

  getJson = (): Observable<Response> => this.json = this.http.get<Response>(this.sourceUrl)
    .pipe(map(response => response))

  // TODO: Return an immutable object
  getFeatures(): Observable<object> {
    return this.getJson()
      .pipe(map(source => {
        this.features = source['features'];
        return this.features;
    }));
  }

}

