import { AfterViewInit, Component } from '@angular/core';
import { MarkerService } from '../_services/marker.service';

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.css']
})
export class AgmMapComponent implements AfterViewInit {

  private agmMap;
  // title = 'My first AGM project';
  lat = 21.678418;
  lng = 7.809007;
  constructor(private markerService: MarkerService) {
  }
  ngAfterViewInit(): void {
    this.markerService.createMarkers(this.agmMap);
  }
}

