import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MarkerService} from '../_services/marker.service';
import {FiltersService} from '../_services/filters.service';
import {Marker} from '../marker.class';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  readonly markers: Observable<Marker[]> = this.markerService.getMarkers();
  keyValues: any;
  public input: string;
  status = false;
  filterForm: FormGroup = new FormGroup({});

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
    console.log('rebuilt form ', form);
    return form;
  }
}
