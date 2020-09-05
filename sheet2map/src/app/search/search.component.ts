import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {JsonService} from '../_services/json.service';
import {SearchService} from '../_services/search.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MarkerService} from '../_services/marker.service';
import {Observable, of} from 'rxjs';
import {Marker} from '../marker';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  // TODO: Store markers returned by markerService.createMarkers() in memory
  searchInput: string = '';
  searchControl = new FormControl();
  tooltipPosition = new FormControl('after');
  public randomPlaceholder: any;
  private selectedResult: any;
  readonly markers: Observable<any[]> = this.markerService.getMarkers();
  filteredMarkers: Observable<any[]>;
  searchForm: FormGroup;

  constructor(
              private markerService: MarkerService,
              private searchService: SearchService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
    });

    this.searchForm = this.formBuilder.group({
      userInput: null
    });

    this.markers.subscribe(markers => {
      this.filteredMarkers = this.searchForm.get('userInput').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(input => this.searchService.searchMarkers(markers, input.toLowerCase()))
      );
    });
  }

  ngAfterViewInit(): void {

  }
  displayFn(property): any {
    if (property) { return property.RepresentativeProperty; }
  }
}


