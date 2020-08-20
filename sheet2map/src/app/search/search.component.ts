import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Globals} from '../globals';
import {JsonService} from '../_services/json.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // TODO Create a shared service for json schema
  public source = Globals.dataURL;
  public features: any[] = Globals.markersJson;
  search = '';
  constructor(private jsonService: JsonService) { }

  ngOnInit(): void {
    const searchArray = this.jsonService.buildInfoTemplate(this.source, this.features);
    console.log(searchArray);
    console.log("markers.Json ", Globals.markersJson);
  }

}
