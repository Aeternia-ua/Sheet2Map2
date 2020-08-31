import {Injectable, Input, Type} from '@angular/core';
import {BehaviorSubject} from "rxjs";

// export class Features {
//   constructor(public component: Type<Feature>, public data: any) {}
// }
//
// class Feature extends Features {
// }

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //Create a subject to share selected search item between search component and map component
  selectedResult = new BehaviorSubject<object>([{}]);
  sharedSelectedResult = this.selectedResult.asObservable();

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

  // Pass in a new selected search item to the BehaviorSubject
  updateSelectedResult(selectedResult): any {
    this.selectedResult.next(selectedResult);
  }
}


