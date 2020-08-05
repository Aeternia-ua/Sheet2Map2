import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-infowindow',
  templateUrl: './infowindow.component.html',
  styleUrls: ['./infowindow.component.css']
})
export class InfowindowComponent implements OnInit {

 public testTitle = 'test official name success!!';
 public test = Globals.dataModel;

  constructor() { }

  ngOnInit(): void {
    console.log("test " + this.test);
  }

}
