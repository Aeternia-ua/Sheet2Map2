import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GspreadsheetParserComponent } from './gspreadsheet-parser.component';

describe('GspreadsheetParserComponent', () => {
  let component: GspreadsheetParserComponent;
  let fixture: ComponentFixture<GspreadsheetParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GspreadsheetParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GspreadsheetParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
