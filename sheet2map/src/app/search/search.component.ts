import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchService} from '../_services/search.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MarkerService} from '../_services/marker.service';
import {Observable, of} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';
import {ClrLoadingState} from '@clr/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  tooltipPosition = new FormControl('below');
  public randomPlaceholder: any;
  private selectedResult: any;
  readonly markers: Observable<any[]> = this.markerService.getMarkers();
  filteredMarkers: Observable<any[]>;
  searchForm: FormGroup;
  searchField: FormControl;

  constructor(
              private markerService: MarkerService,
              private searchService: SearchService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
    });

    this.searchForm = this.formBuilder.group({searchField: [this.searchField]});
    this.markers.subscribe(markers => {
      console.log(this.searchForm);
      this.filteredMarkers = this.searchForm.get('searchField').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(input => this.searchService.searchMarkers(markers, input))
      );
    });
  }

  displayFn(marker): string {
    if (marker) {
      return marker.representativeProperty;
    }
  }

  clearSearchField(): void {
    this.searchForm.get('searchField').reset();
  }
}


