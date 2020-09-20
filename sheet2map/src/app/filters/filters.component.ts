import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MarkerService} from '../_services/marker.service';
import {FiltersService} from '../_services/filters.service';
import {Marker} from '../marker.class';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

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
  filterCheckbox: FormControl = new FormControl(false);
  private filterForm: FormGroup;

  constructor(private markerService: MarkerService,
              private filtersService: FiltersService,
              private changeDetectorRef: ChangeDetectorRef,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.markers.subscribe(markers => { // Subscribe to shared markers data
      this.keyValues = this.filtersService.generateFilters(markers);
      this.changeDetectorRef.detectChanges();
    });
    // this.filterCheckbox = new FormControl(false);
  }
}
