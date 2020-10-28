import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Observable} from 'rxjs';
import {MarkerService} from '../_services/marker.service';
import {FiltersService} from '../_services/filters.service';
import {Marker} from '../marker.class';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from 'events';
import {SharedFilterFormService} from '../_services/shared-filter-form.service';
import {Filter} from '../filter.class';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {
  readonly markers: Observable<Marker[]> = this.markerService.getMarkers();
  private filterProperties: object;
  public input: string;
  filterForm: FormGroup = new FormGroup({});
  @ViewChildren('clearFiltersBtn') clearFiltersButtons: QueryList<ElementRef>;
  @Input()selectedFilters: Filter[];
  private filters: Filter[];

  constructor(private markerService: MarkerService,
              private filtersService: FiltersService,
              private changeDetectorRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private sharedFilterFormService: SharedFilterFormService) { }

  ngOnInit(): void {
    this.markers.subscribe(markers => { // Subscribe to shared markers data
      this.filterProperties = this.filtersService.getFilterProperties(markers);
      this.filterForm = this.buildFilterForm(this.filterProperties); // Build reactive FormGroup
      this.sharedFilterFormService.nextFilterForm(this.filterForm); // Pass form to the shared service for access in search component
      this.changeDetectorRef.detectChanges();
      this.filtersService.selectedFiltersChange.subscribe(selectedFilters => {
        this.selectedFilters = selectedFilters;
        // TODO: Add toggle clearFiltersBtn check here?
        this.filtersService.updateFilteredMarkers(this.selectedFilters, markers); });
      this.onChange();
    });
  }

  private buildFilterForm(filterProperties: object): FormGroup {
    const form: FormGroup = this.formBuilder.group({});
    Object.entries(filterProperties).forEach(([key, values]) => {
      form.setControl(key, this.formBuilder.group({}));
      values.forEach(value => {
        const filterValue = value[0];
        const numberOfMarkers = value[1];
        // (form.get(key) as FormGroup).addControl(value[0], new FormControl(false));
        (form.get(key) as FormGroup).addControl(filterValue, new FormControl(false));
        const control = (form.get(key) as FormGroup).get(filterValue);
        if (control) {
          control['numberOfMarkers'] = numberOfMarkers;
        }
      });
    });
    console.log('.controls ', form.controls);
    return form;
  }

  public uncheckFilters(filterCategory): void {
    this.disableClearFiltersBtn(filterCategory);
    (this.filterForm.get(filterCategory) as FormGroup).reset();
  }

  onChange(): void {
    this.filterForm.valueChanges.subscribe(() => {
      this.clearFiltersButtons.forEach((categoryBtn, index) => {
        const categoryFilter = (this.filterForm.get(categoryBtn.nativeElement.name) as FormGroup).controls;
        const checkboxIsChecked = Object.entries(categoryFilter).find(([key, checkbox]) => checkbox.value === true);
        if (checkboxIsChecked) { // If at least one checkbox is checked, enable button
            categoryBtn.nativeElement.disabled = false;
          } else {
          categoryBtn.nativeElement.disabled = true;
          }
      });
    });
  }

  private disableClearFiltersBtn(filterCategory): void {
    (this.clearFiltersButtons.find((btn, index) => btn.nativeElement.name === filterCategory))
      .nativeElement.disabled = true;
  }
}
