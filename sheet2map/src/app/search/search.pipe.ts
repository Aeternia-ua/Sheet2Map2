import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe',
  pure: true
})

export class SearchPipe implements PipeTransform {
  transform(markers: any[], input: string): any[] {
    // console.log('search pipe marker 0 ', markers[0], markers[0].value.markerId)
    if (!input) { return markers; }
    if (!markers) { return []; }
    const filteredMarkers = markers.filter(marker => marker.value.searchProperty.includes(input) >= 1);
    console.log('filtered ', filteredMarkers);
    return filteredMarkers;
   }
}
