import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchValue): any {
    if (!searchValue) { return value; }
    return value.filter((v) =>
      v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      v.size.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  }
}
