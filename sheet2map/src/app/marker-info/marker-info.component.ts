import {Component, Input, OnInit} from '@angular/core';
import {InfoComponent} from '../interfaces/info.component';

@Component({
  selector: 'app-marker-info',
  templateUrl: './marker-info.component.html',
  styleUrls: ['./marker-info.component.css']
})
export class MarkerInfoComponent implements InfoComponent {

  @Input() data: any;

}
