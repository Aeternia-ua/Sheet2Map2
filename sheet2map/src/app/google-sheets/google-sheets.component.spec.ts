import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSheetsComponent } from './google-sheets.component';

describe('GoogleSheetsComponent', () => {
  let component: GoogleSheetsComponent;
  let fixture: ComponentFixture<GoogleSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
