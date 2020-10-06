import { Component, OnInit } from '@angular/core';
import {GeolocationControlService} from '../_services/geolocation-control.service';

@Component({
  selector: 'app-leaflet-geolocation-control',
  templateUrl: './leaflet-geolocation-control.component.html',
  styleUrls: ['./leaflet-geolocation-control.component.css']
})
export class LeafletGeolocationControlComponent implements OnInit {
  btnIsActive: boolean;
  constructor(public geolocationControlService: GeolocationControlService) { }

  ngOnInit(): void {
    this.geolocationControlService.btnStateChange.subscribe(isActive => {
      this.btnIsActive = isActive;
    });
  }

}
