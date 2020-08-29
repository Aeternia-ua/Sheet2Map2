import {Injectable, Input} from '@angular/core';
import {JsonService} from "./json.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Input()features;
  properties: any;

  constructor(private jsonService: JsonService) { }

  // Create dynamic placeholder based on random property value
  getRandomProperty(features) {
    let randomFeature = features[Math.floor(Math.random() * features.length)];
    let properties = Object.values(randomFeature.properties);
    let randomProperty = properties[Math.floor(Math.random() * properties.length)];
    return randomProperty;
  }
}


