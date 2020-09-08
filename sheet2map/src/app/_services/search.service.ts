import {Injectable, Input, Type} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Create a subject to share selected search item between search component and map components
  selectedResult = new BehaviorSubject<object>([{}]);
  sharedSelectedResult = this.selectedResult.asObservable();

  constructor() { }

  searchMarkers(markers: any[], input: string): any[] {
    if (!input) { return markers; }
    if (!markers) { return []; }
    const filteredMarkers = [markers.filter(marker => marker.searchProperty.includes(input) >= 1)];
    return filteredMarkers;
  }

  // Create dynamic placeholder based on random property value
  getRandomPlaceholder(features) {
    const randomFeature = features[Math.floor(Math.random() * features.length)];
    const properties = Object.values(randomFeature.properties);
    const randomProperty = properties[Math.floor(Math.random() * properties.length)];
    return randomProperty;
  }

  // Pass in a new selected search item to the BehaviorSubject
  updateSelectedResult(selectedResult): any {
    this.selectedResult.next(selectedResult);
  }
}


