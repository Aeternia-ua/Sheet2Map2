import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http: HttpClient) { }

  createJson(src) {
    return this.http.get<Response>(src)
    .pipe(map(response => response));
  }

  buildInfoTemplate(source, features): void {
    this.createJson(source)
      .subscribe(
        (jsonData) => {
          // Passing JSON data to the json global variable
          features = jsonData['features'];
        }
    );
  }

  createDataTemplate(data): [] {
    let keys;
    let template;
    const features = data.features;
    features.forEach(feature => {
      keys = Object.keys(feature.properties);
    }
    );
    template = [...new Set(keys)];
    return template;
  }

}
