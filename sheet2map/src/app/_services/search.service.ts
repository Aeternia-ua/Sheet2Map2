import {Injectable, Input} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // @Input()features;
  // properties: any;

  constructor() { }

  getSearchProperties(features): void {
    features.forEach(feature => {
      let props = Object.values(feature.properties).join(', ').toString();
      feature.representativeProperty = props;
      feature.searchProperty = props.toLowerCase();
    });
  }

  // Create dynamic placeholder based on random property value
  getRandomPlaceholder(features) {
    let randomFeature = features[Math.floor(Math.random() * features.length)];
    let properties = Object.values(randomFeature.properties);
    let randomProperty = properties[Math.floor(Math.random() * properties.length)];
    return randomProperty;
  }

  locateMarker(feature, map): object {
    console.log("feature to locate is ", feature);
    let lat = feature.value.geometry.coordinates[0];
    let lon = feature.value.geometry.coordinates[1];
    // Zoom to searched marker
    // map.setView(feature.[lon, lat], 13);
    console.log('search marker coordinates ', [lon, lat]);
    return feature;
  }
}


