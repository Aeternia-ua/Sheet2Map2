import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmGeolocationControlComponent } from './agm-geolocation-control.component';

describe('AgmGeolocationControlComponent', () => {
  let component: AgmGeolocationControlComponent;
  let fixture: ComponentFixture<AgmGeolocationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgmGeolocationControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgmGeolocationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
