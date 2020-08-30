import {Component, Input, OnInit} from '@angular/core';
import {JsonService} from '../_services/json.service';
import {SearchService} from "../_services/search.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // TODO Create a shared service for json model
  searchInput: string = '';
  public features: any;
  searchControl = new FormControl();
  tooltipPosition = new FormControl('after');
  public randomPlaceholder: any;

  constructor(private jsonService: JsonService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures(): void {
    this.jsonService.getFeatures().subscribe((features: object) => {
      this.features = features;
      this.searchService.getSearchProperties(features);
      console.log(this.features);
      this.randomPlaceholder = this.searchService.getRandomPlaceholder(features);
    });
  }
}


