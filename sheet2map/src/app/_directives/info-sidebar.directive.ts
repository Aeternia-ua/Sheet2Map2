import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appInfoSidebar]'
})
export class InfoSidebarDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
