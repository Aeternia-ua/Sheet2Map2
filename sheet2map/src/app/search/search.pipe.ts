import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})

export class SearchPipe implements PipeTransform {

  transform(features: any[], input: string): any[] {
    let properties: any[];
    if(!input) return features;
    if(!features) return [];
    input = input.toLowerCase();
    properties = Object.entries(features[1]['value']).map(([key, value]) => ({['key']: key, ['value']: value}));
    let filteredProperties = properties.filter(property => property['value']
    // TODO: Figure out why everything slows down when removing >=1
      .toString().toLowerCase().includes(input) >=1);
    return filteredProperties;
   }

    // transform(features: object, input: string): object {
    //   let properties: any;
    //   input = input.toLowerCase();
    //   properties = Object.entries(features[1]['value']).map(([key, value]) => ({['key']: key, ['value']: value}));
    //   let filteredProperties = properties.filter(el => el['value'].toString().toLowerCase().indexOf(input) >= 1);
    //         console.log('filteredProperties ', filteredProperties);
    //   return filteredProperties;
    // }
}
