import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../_services/search.service';
import {Form, FormBuilder, FormControl, FormGroup, NgControl} from '@angular/forms';
import {MarkerService} from '../_services/marker.service';
import {Observable, of} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';
import {ClrLoadingState} from '@clr/angular';
import {FiltersService} from '../_services/filters.service';
import {Marker} from '../marker.class';
import {Filter} from '../filter.class';
import {FiltersComponent} from '../filters/filters.component';
import {SharedFilterFormService} from '../_services/shared-filter-form.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public randomPlaceholder: any;
  private selectedResult: any;
  readonly markers: Observable<Marker[]> = this.markerService.getMarkers();
  searchResults: Observable<any[]>;
  searchForm: FormGroup;
  searchField: FormControl;
  @Input()selectedFilters: Filter[];
  @Input()filteredMarkers: Marker[];
  @Input() filterForm: Observable<FormGroup> = this.sharedFilterFormService.sharedFilterForm;

  constructor(
              private markerService: MarkerService,
              private searchService: SearchService,
              private filtersService: FiltersService,
              private formBuilder: FormBuilder,
              private sharedFilterFormService: SharedFilterFormService) {
  }

  ngOnInit(): void {
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
    });

    this.filtersService.selectedFiltersChange.subscribe(selectedFilters => {
      this.selectedFilters = selectedFilters;
    });

    this.searchForm = this.formBuilder.group({searchField: [this.searchField]});

    this.markers.subscribe(markers => {
      this.filtersService.initFilteredMarkers(markers).subscribe(filteredMarkers => {
        this.filteredMarkers = filteredMarkers;
        this.searchResults = this.searchForm.get('searchField').valueChanges
          .pipe(
            debounceTime(300),
            switchMap(input => this.searchService.searchMarkers(this.filteredMarkers, input))
          );
      });
    });
  }

  clearSearchField(): void {
    this.searchForm.get('searchField').reset();
  }

  dismiss(filterCategory: string, filterValue: string): void {
    this.selectedFilters.splice(this.selectedFilters.findIndex(element =>
      element.Category === filterCategory && element.Value === filterValue), 1);
    this.updateFilters();
    this.uncheckFilter(filterCategory, filterValue);
  }

  updateFilters(): void {
    this.filtersService.selectedFiltersChange.next(this.selectedFilters);
  }

  uncheckFilter(filterCategory: string, filterValue: string): void {
    this.filterForm.subscribe(form => {
      // Fields with dot in name cannot be retrieved using form.get(). Should use form.get([]) instead
      const categoryFilters: FormGroup = (form.get([filterCategory]) as FormGroup);
      (categoryFilters.get([filterValue]) as FormControl).setValue(false);
     });
  }
}


