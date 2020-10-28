import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appSearchFiltersContainer]'
})
export class SearchFiltersContainerDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
