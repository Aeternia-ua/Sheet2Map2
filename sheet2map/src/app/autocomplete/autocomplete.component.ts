import {Component, ContentChild, ContentChildren, OnInit, QueryList, TemplateRef, ViewChild} from '@angular/core';
import {OptionComponent} from './option/option.component';
import {switchMap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {AutocompleteContentDirective} from '../_directives/autocomplete-content.directive';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  exportAs: 'appAutocomplete'
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('root') rootTemplate: TemplateRef<any>;
  @ContentChild(AutocompleteContentDirective)
  content: AutocompleteContentDirective;
  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);
        return merge(...clicks$);
      })
    );
  }

}
