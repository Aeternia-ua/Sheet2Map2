import {Injectable, Input} from '@angular/core';
import {JsonService} from "./json.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Input()features;

  constructor(private jsonService: JsonService) { }

  // Get feature properties
  // TODO: then implement search by property value
  printFeatureProperties(features) {
          console.log('feature properties', features[0].properties)
  }
}

