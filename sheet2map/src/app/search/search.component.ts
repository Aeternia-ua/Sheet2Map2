import {Component, Input, OnInit} from '@angular/core';
import {JsonService} from '../_services/json.service';
import {SearchService} from "../_services/search.service";
import {SearchPipe} from './search.pipe';
import {FormControl} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // TODO Create a shared service for json model
  searchInput: string = '';
  public features: any;
  testNum = 0;
  searchControl = new FormControl();
  public randomProperty: any;

  constructor(private jsonService: JsonService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.getFeatures();
  }
  // TODO: Pass features to the local variable
  getFeatures(): void {
    this.jsonService.getFeatures().subscribe((features: object) => {
      this.features = features;
      this.randomProperty = this.searchService.getRandomProperty(features);
    });
    // this.filteredProperties = this.searchControl.valueChanges
  }
  TEST1(): number {
    this.testNum = this.testNum + 1;
    console.log("test1 ", this.testNum);
    return this.testNum;
  }
}


