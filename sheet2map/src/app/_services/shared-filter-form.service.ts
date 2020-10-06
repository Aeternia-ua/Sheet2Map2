import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedFilterFormService {
  private filterForm = new BehaviorSubject<FormGroup>(null);
  sharedFilterForm = this.filterForm.asObservable();

  constructor() { }

  nextFilterForm(filterForm): void {
    this.filterForm.next(filterForm);
  }
}
