import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})

export class SearchPipe implements PipeTransform {
  transform(features: any[], input: string): any[] {
    if(!input) return features;
    if(!features) return [];
    let filteredFeatures = features.filter(feature => feature.value.searchProperty.includes(input) >= 1);
    return filteredFeatures;
   }
}
