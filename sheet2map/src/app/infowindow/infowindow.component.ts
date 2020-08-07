import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Globals } from '../globals';
import { DataModelService } from '../_services/data-model.service';

@Component({
  selector: 'app-infowindow',
  templateUrl: './infowindow.component.html',
  styleUrls: ['./infowindow.component.css']
})
export class InfowindowComponent implements AfterViewInit {

  public testTitle = 'test official name success!!';
  public test = Globals.dataModel;
  public source = Globals.dataURL;
  private dataModel = [];
  // public infoWindowContainer = document.getElementById('infowindow');
  public infoWindowContainer = document.getElementsByTagName('mat-sidenav');

  constructor(private dataModelService: DataModelService) { }

  ngAfterViewInit(): void {
    this.buildDataModel();
  }
  private buildDataModel(): void {
    this.dataModelService.createJson(this.source)
      .subscribe(
        (jsonData) => {
          this.dataModel = this.dataModelService.createDataTemplate(jsonData);
          Globals.dataModel.fill(this.dataModel);
          console.log('resulting dataModel: ' + this.dataModel);
          this.buildInfoWindowTemplate(this.dataModel, this.infoWindowContainer);
        }
    );
  }
  buildInfoWindowTemplate(template, parent) {
    console.log('parent: ' + parent);
    const list = document.createElement('mat-list');
    template.forEach(el => {
      const label = el;
      // create DOM elements
      const listItem = document.createElement('mat-list-item');
      const listItemContent = document.createElement('h3');
      listItemContent.innerHTML = label;
      parent[0].appendChild(list);
      // parent.appendChild(list);
      list.appendChild(listItem);
      listItem.appendChild(listItemContent);
      }
    );
    
    console.log(list);
  }
}



