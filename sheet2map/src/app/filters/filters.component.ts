import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MarkerService} from '../_services/marker.service';
import {FiltersService} from '../_services/filters.service';
import {Marker} from '../marker.class';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, AfterViewInit {
  readonly markers: Observable<any[]> = this.markerService.getMarkers();
  keyValues: object;
  public input: string;

  constructor(private markerService: MarkerService,
              private filtersService: FiltersService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.markers.subscribe(markers => { // Subscribe to shared markers data
      this.keyValues = this.filtersService.generateFilters(markers);
    });
  }
}
