import { Injectable } from '@angular/core';
import {AgmGeolocationService} from './agm-geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class AgmGeolocationControlService {
  private controlUI: any;

  constructor(private agmGeolocationService: AgmGeolocationService) { }

  addGeolocationControl(map: google.maps.Map): void { // Create the DIV to hold the control
    const controlDiv = document.createElement('div');
    this.GeolocationControl(controlDiv, map);
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(controlDiv);
  }

  private GeolocationControl(controlDiv, map): void {

    this.controlUI = document.createElement('div'); // Set CSS for the control border
    this.controlUI.style.width = '40px';
    this.controlUI.style.height = '40px';
    this.controlUI.style.backgroundColor = '#fff';
    this.controlUI.style.display = 'block';
    this.controlUI.style.border = '0px';
    this.controlUI.style.borderRadius = '2px';
    this.controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    this.controlUI.style.cursor = 'pointer';
    this.controlUI.style.marginRight = '10px';
    this.controlUI.style.overflow = 'hidden';
    this.controlUI.style.textAlign = 'center';
    this.controlUI.title = 'Your location';
    controlDiv.appendChild(this.controlUI);

    const controlText = document.createElement('div'); // Set CSS for the control interior
    controlText.style.fontFamily = 'Fontawesome';
    controlText.textContent = '\uf124';
    controlText.style.fontSize = '24px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    this.controlUI.appendChild(controlText);

    this.controlUI.addEventListener('click', () => {
      this.agmGeolocationService.getUserLocation(map);
    });
  }
}
