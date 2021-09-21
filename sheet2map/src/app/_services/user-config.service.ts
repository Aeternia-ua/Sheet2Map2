import { Injectable } from '@angular/core';
import {UserFilter} from "../user-config";

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  constructor() { }

  getUserFilters(sheetObject: {}): UserFilter[] {
    const userFilters: UserFilter[] = [];
    const values  = (sheetObject['data']['values']);
    values.forEach(value => {
      const userFilter = new UserFilter(value[0], value.slice(1));
      userFilters.push(userFilter);
    });
    return userFilters;
    }
}
