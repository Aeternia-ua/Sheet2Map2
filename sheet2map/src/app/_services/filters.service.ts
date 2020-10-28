import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Filter} from '../filter.class';
import {Marker} from '../marker.class';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  // Create a subject to share selected filtering properties between filters component and map components
  selectedFilters: Filter[] = [];
  selectedFiltersChange = new Subject<Filter[]>();
  private filteredMarkers = new BehaviorSubject<Marker[]>(null);
  sharedFilteredMarkers = this.filteredMarkers.asObservable();

  constructor() {
  }

  getFilterProperties(markers): object {
    const markerFProps: any[] = [];
    markers.forEach(marker => {
      const props = marker.feature.properties;
      const fProp = Object.keys(props).filter(prop => prop.includes('o'))
        .map(key => ({[key]: props[key]}));
      markerFProps.push(fProp);
    });

    const reducedMarkerFProps: any[] = [].concat(...markerFProps).reduce((result, object) => {
      Object.entries(object).forEach(([key, value]) => (result[key] = result[key] || []).push(value));
      return result;
    }, Object.create(null));

    const filterProperties: object = {};
    Object.entries(reducedMarkerFProps).forEach(([key, value]) => {
          const fValues = this.buildFilterValues(value); // TODO: rename variable
          filterProperties[key] = [...new Set(fValues)];
      }
    );
    return filterProperties;
  }

  // Get unique filter values and count the occurrences of each filter value // TODO: rename method
  buildFilterValues(array): Map<any, number> {
    const arrayCount = new Map([...new Set(array)].map(
        x => [x, array.filter(y => y === x).length]
    ));
    return arrayCount;
  }

  getSelectedFilters(key: string, value: string, numOfMarkers: number, event): void {
    const selectedFilter = new Filter(key, value, numOfMarkers);
    if (event.target.checked) {
      this.selectedFilters.push(selectedFilter);
    } else {
      this.selectedFilters.splice(this.selectedFilters
        .findIndex(element =>
          element.Category === selectedFilter.Category && element.Value === selectedFilter.Value), 1);
    }
    this.selectedFiltersChange.next(this.selectedFilters); // Pass in new selected filters to BehaviorSubject
  }

  initFilteredMarkers(markers): Observable<Marker[]> {
    if (this.filteredMarkers.value === null) { // If no filters are selected, return unfiltered markers
      this.filteredMarkers.next(markers);
    }
    else {
      return this.filteredMarkers;
    }
    return this.filteredMarkers;
  }

  updateFilteredMarkers(selectedFilters, markers: Marker[]): any {
    if (selectedFilters.length === 0) {
      this.filteredMarkers.next(markers);
    }
    else {
      let filteredMarkers: Marker[] = markers;
      const categories: any = [...new Set(selectedFilters.map(element => element.Category))];
      categories.forEach(category => {
        const selectedValues = selectedFilters.filter(el => el.Category === category).map(el => el.Value);
        filteredMarkers = this.filterByCategory(filteredMarkers, category, selectedValues);
      });
      this.filteredMarkers.next(filteredMarkers);
    }
  }

  filterByCategory(markers: Marker[], category: string, categoryValues: string[]): Marker[] {
    const filteredMarkers: Marker[] = [];
    categoryValues.forEach(selectedValue =>
      filteredMarkers.push(...markers.filter(el => el.Feature.Properties[category] === selectedValue)));
    return filteredMarkers;
  }

  clearFilters(category): void {
    const updatedFilters = this.selectedFilters.filter(element => element.Category !== category);
    this.selectedFiltersChange.next(this.selectedFilters = updatedFilters);
  }
}
