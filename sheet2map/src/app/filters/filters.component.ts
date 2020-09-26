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

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  readonly markers: Observable<Marker[]> = this.markerService.getMarkers();
  keyValues: any;
  public input: string;
  filterForm: FormGroup = new FormGroup({});
  @ViewChildren('clearFiltersBtn') clearFiltersButtons: QueryList<ElementRef>;
  @Output() btnClick = new EventEmitter();

  constructor(private markerService: MarkerService,
              private filtersService: FiltersService,
              private changeDetectorRef: ChangeDetectorRef,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.markers.subscribe(markers => { // Subscribe to shared markers data
      this.keyValues = this.filtersService.generateFilters(markers);
      this.filterForm = this.buildFilterForm(this.keyValues); // Build reactive FormGroup
      this.changeDetectorRef.detectChanges();
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

  private uncheckFilters(category): void {
    this.disableClearFiltersBtn(category);
    (this.filterForm.get(category) as FormGroup).reset();
  }

  private toggleClearFiltersBtn(category): void {
    const button = this.clearFiltersButtons.find((btn, index) => btn.nativeElement.name === category);
    const filters = (this.filterForm.get(category) as FormGroup).controls;
    const checkboxIsChecked = Object.entries(filters).find(([key, checkbox]) => checkbox.value === true);
    if (checkboxIsChecked) { // If at least one checkbox is checked, enable button
      button.nativeElement.disabled = false;
    }
    else {
      button.nativeElement.disabled = true;
    }
  }

  private disableClearFiltersBtn(category): void {
    (this.clearFiltersButtons.find((btn, index) => btn.nativeElement.name === category))
      .nativeElement.disabled = true;
  }
}
