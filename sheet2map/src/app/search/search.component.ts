import {AfterViewInit, Component, OnInit} from '@angular/core';
import {JsonService} from '../_services/json.service';
import {SearchService} from '../_services/search.service';
import {FormControl} from '@angular/forms';
import {MarkerService} from '../_services/marker.service';
import {Observable} from 'rxjs';

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
  readonly markers2: Observable<any[]> = this.markerService.getMarkers();

  constructor(private jsonService: JsonService,
              private markerService: MarkerService,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.markers2.subscribe(markers => {
      console.log('search component markers ', markers);
    });
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
    });
  }
}


