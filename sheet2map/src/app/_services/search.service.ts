import {Injectable, Input, Type} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //Create a subject to share selected search item between search component and map components
  selectedResult = new BehaviorSubject<object>([{}]);
  sharedSelectedResult = this.selectedResult.asObservable();

  constructor() { }

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


