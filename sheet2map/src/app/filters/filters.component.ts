import {AfterViewInit, Component, OnInit} from '@angular/core';
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
  input: boolean;
  private filterCategory: any[];
  keyValues: object;

  readonly markers: Observable<any[]> = this.markerService.getMarkers();

  constructor(private markerService: MarkerService,
              private filtersService: FiltersService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.markers.subscribe(markers => { // Subscribe to shared markers data
      this.keyValues = this.filtersService.generateFilters(markers);
      // this.filterMarkers();
    });
  }

  filterMarkers(): any {
    const result = 'smth that happens on checkbox click';
    // let filteredMarkers: Marker;
    console.log(result);
    return result;
  }
}
