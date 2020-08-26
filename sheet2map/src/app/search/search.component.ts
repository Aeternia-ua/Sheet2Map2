import {Component, Input, OnInit} from '@angular/core';
import {JsonService} from '../_services/json.service';
import {SearchService} from "../_services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // TODO Create a shared service for json model
  search = '';
  features: object;

  constructor(private jsonService: JsonService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures(): void {
    this.jsonService.getFeatures().subscribe((features: object) => {console.log('json service features ', features)
      this.searchService.printFeatureProperties(features);
    });

    // TODO: Pass features to local variable
    this.features = this.jsonService.getFeatures().subscribe((features: object) => this.features = features);
    console.log('search component features' , this.features);

  }
}
