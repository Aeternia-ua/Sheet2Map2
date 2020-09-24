import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Filter} from '../filter.class';
import {Marker} from '../marker.class';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  // Create a subject to share selected filtering properties between filters component and map components
  private selectedFilters: Filter[] = [];
  selectedFiltersChange = new Subject<any>();

  constructor() {
  }

  generateFilters(markers): object {
    const filterProperties: any[] = [];
    markers.forEach(marker => {
      const properties = marker.feature.properties;
      const filterProperty = Object.keys(properties).filter(property => property.includes('o'))
        .map(key => ({[key]: properties[key]}));
      filterProperties.push(filterProperty);
    });

    const reduced: any[] = [].concat(...filterProperties).reduce((result, object) => {
      Object.entries(object).forEach(([key, value]) => (result[key] = result[key] || []).push(value));
      return result;
    }, Object.create(null));
    const keyValues: object = {};
    Object.entries(reduced).forEach(([key, value]) => keyValues[key] = [...new Set(value)]);
    return keyValues;
  }

  getSelectedFilters(key, value, event): void {
    const selectedFilter = new Filter(key, value);
    if (event.target.checked) {
      this.selectedFilters.push(selectedFilter);
    } else {
      this.selectedFilters.splice(this.selectedFilters
        .findIndex(element => element.Key === selectedFilter.Key && element.Value === selectedFilter.Value), 1);
    }
    this.selectedFiltersChange.next(this.selectedFilters); // Pass in new selected filters to BehaviorSubject
  }

  getFilteredMarkers(selectedFilters, markers: Marker[]): Marker[] {
    let filteredMarkers: Marker[] = [];
    if (selectedFilters.length === 0) {
      return markers;
    }
    const categories: any = [...new Set(selectedFilters.map(element => element.key))];
    filteredMarkers = markers;

    categories.forEach(category => {
      const selectedValues = selectedFilters.filter(el => el.key === category).map(el => el.value);
      filteredMarkers = this.filterByCategory(filteredMarkers, category, selectedValues);
    });
    return filteredMarkers;
  }

  filterByCategory(markers: Marker[], category: string, categoryValues: string[]): Marker[] {
    const filteredMarkers: Marker[] = [];
    categoryValues.forEach(selectedValue =>
      filteredMarkers.push(...markers.filter(el => el.Feature.Properties[category] === selectedValue)))
    // for (const selectedValue of categoryValues) {
    //   filteredMarkers.push(...markers.filter(el => el.Feature.Properties[category] === selectedValue));
    // }
    return filteredMarkers;
  }

  clearFilters(category): void {
    const updatedFilters = this.selectedFilters.filter(element => element.Key !== category);
    this.selectedFiltersChange.next(this.selectedFilters = updatedFilters);
    console.log('NEW this.selectedFilters ', this.selectedFilters);
  }
}
