import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agm-geolocation-control',
  templateUrl: './agm-geolocation-control.component.html',
  styleUrls: ['./agm-geolocation-control.component.css']
})
export class AgmGeolocationControlComponent implements OnInit {
    private controlUI: any;

  constructor() { }

  ngOnInit(): void {
  }

}
