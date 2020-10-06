import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GeolocationControlService} from '../_services/geolocation-control.service';

@Component({
  selector: 'app-agm-geolocation-control',
  templateUrl: './agm-geolocation-control.component.html',
  styleUrls: ['./agm-geolocation-control.component.css']
})
export class AgmGeolocationControlComponent implements OnInit {
  btnIsActive: boolean;

  constructor(public geolocationControlService: GeolocationControlService) { }

  ngOnInit(): void {
    this.geolocationControlService.btnStateChange.subscribe(isActive => {
      this.btnIsActive = isActive;
    });
  }
}
