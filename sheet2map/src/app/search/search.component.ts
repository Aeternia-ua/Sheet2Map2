import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {JsonService} from '../_services/json.service';
import {SearchService} from "../_services/search.service";
import {FormControl} from "@angular/forms";
import {MarkerService} from "../_services/marker.service";
import {share} from "rxjs/operators";
import {Observable} from "rxjs";
import {Memoize} from "typescript-memoize";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Memoize() get markers() { return this.markerService.createMarkers(); }
  // TODO Create a shared service for json model
  searchInput: string = '';
  searchControl = new FormControl();
  tooltipPosition = new FormControl('after');
  public randomPlaceholder: any;
  private selectedResult: any;
  // private markers: Observable<any[]>;

  constructor(private jsonService: JsonService,
    private markerService: MarkerService,
    private searchService: SearchService) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
    })
  }
  //
  // private getMarkers(): Observable<any[]> {
  //   // return this.markerService.createMarkers().pipe(share());
  //   return this.markerService.markers.pipe(share());
  // }
}


