import { Injectable } from '@angular/core';
import {Marker} from '../marker.class';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() { }

  generateFilters(markers): object {

    const filterProperties: any[] = [];
    for (const marker of markers) {
      const properties = marker.feature.properties;
      const filterProperty = Object.keys(properties).filter(property => property.includes('O'))
      .map(key => ({ [key]: properties[key] }));
      filterProperties.push(filterProperty);
    }
    const reduced = [].concat(...filterProperties).reduce((result, object) => {
        Object.entries(object).forEach(([key, value]) => (result[key] = result[key] || []).push(value));
        return result;
    }, Object.create(null));

    const keyValues: object = {};
    Object.entries(reduced).forEach(([key, value]) => keyValues[key] = [... new Set(value)]);
    console.log('unique filter props ', keyValues);
    return keyValues;
    }
}
