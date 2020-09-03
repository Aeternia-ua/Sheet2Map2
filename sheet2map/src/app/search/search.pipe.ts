import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe',
  pure: true
})

export class SearchPipe implements PipeTransform {
  transform(markers: any[], input: string): any[] {
    console.log('search pipe marker 0 ', markers[0], markers[0].id)
    if(!input) return markers;
    if(!markers) return [];
    let filteredMarkers = markers.filter(marker => marker.value.searchProperty.includes(input) >= 1);
    return filteredMarkers;
   }
}
