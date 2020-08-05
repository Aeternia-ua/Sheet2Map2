import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  constructor(private http: HttpClient) { }
  public source = Globals.dataURL;
  private jsonDataModel = Globals.dataModel;

// TODO Implement actual json parser
  createDataModel(): void {
    this.http.get(this.source).subscribe((data: any) => {
      for (const feature of data.features) {
        this.jsonDataModel.push(feature);
      }
    });
    // console.log(this.dataModel);
  }
}
