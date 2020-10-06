import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletGeolocationControlComponent } from './leaflet-geolocation-control.component';

describe('LeafletGeolocationControlComponent', () => {
  let component: LeafletGeolocationControlComponent;
  let fixture: ComponentFixture<LeafletGeolocationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeafletGeolocationControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletGeolocationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
