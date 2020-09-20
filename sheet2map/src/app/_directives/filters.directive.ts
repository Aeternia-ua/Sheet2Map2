import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject, OnDestroy,
  Type,
  ViewContainerRef
} from '@angular/core';
import {FiltersComponent} from '../filters/filters.component';

@Directive({
  selector: '[appFilters]'
})
export class FiltersDirective implements AfterViewInit, OnDestroy{
  private filtersComponent: ComponentRef<FiltersComponent> = null;
  @Inject(FiltersComponent) private filtersComp: Type<FiltersComponent>;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              ) { }

  ngAfterViewInit(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.filtersComp);
    this.ngOnDestroy();
    this.filtersComponent = this.viewContainerRef.createComponent(factory, null, this.viewContainerRef.injector);
    this.filtersComponent.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.filtersComponent) {
      this.filtersComponent.changeDetectorRef.detach();
    }
  }

}
