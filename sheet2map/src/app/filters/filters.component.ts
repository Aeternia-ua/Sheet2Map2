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
  private keyValues: object;
  public input: string;
  filterForm: FormGroup = new FormGroup({});
  @ViewChildren('clearFiltersBtn') clearFiltersButtons: QueryList<ElementRef>;
  @Input()selectedFilters: Filter[];

  constructor(private markerService: MarkerService,
              private filtersService: FiltersService,
              private changeDetectorRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private sharedFilterFormService: SharedFilterFormService) { }

  ngOnInit(): void {
    this.markers.subscribe(markers => { // Subscribe to shared markers data
      this.keyValues = this.filtersService.generateFilters(markers);
      this.filterForm = this.buildFilterForm(this.keyValues); // Build reactive FormGroup
      this.sharedFilterFormService.nextFilterForm(this.filterForm); // Pass form to the shared service for access in search component
      this.changeDetectorRef.detectChanges();
      this.filtersService.selectedFiltersChange.subscribe(selectedFilters => {
        this.selectedFilters = selectedFilters;
        // TODO: Add toggle clearFiltersBtn check here?
        this.filtersService.updateFilteredMarkers(this.selectedFilters, markers); });
      this.onChange();
    });
  }

  private buildFilterForm(keyValues: object): FormGroup {
    const form: FormGroup = this.formBuilder.group({});
    Object.entries(keyValues).forEach(([key, values]) => {
      form.setControl(key, this.formBuilder.group({}));
      values.forEach(value => {(form.get(key) as FormGroup).addControl(value, new FormControl(false)); });
    });
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
