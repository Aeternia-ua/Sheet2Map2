import {Observable, Subject} from 'rxjs';
import {UserLocation} from './_interfaces/userLocation';
import {map} from 'rxjs/operators';

export class GeoLocator implements UserLocation {
  accuracy: number;
  latitude: number;
  longitude: number;
  private usrLoc$ = new Subject<UserLocation>();

  static set(data): UserLocation {
    return { latitude: data.latitude, longitude: data.longitude, accuracy: data.accuracy };
  }

  get UserLocation(): Observable<UserLocation> {
    return this.fetchUserLocation().pipe(map((el) => el));
  }

  private fetchUserLocation(): Observable<UserLocation> {
    let usrLoc: UserLocation;
    if (navigator.geolocation) { // Try HTML5 geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        usrLoc = GeoLocator.set({
          accuracy: position.coords.accuracy,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        this.usrLoc$.next(usrLoc);
      }, () => {
        this.handleLocationError(true); // Geolocation service failed
      },
        ({enableHighAccuracy: true})); // PositionOptions
    } else {
      this.handleLocationError(false); // Browser doesn't support Geolocation
    }
    console.log('userloc instance ', this.usrLoc$);
    return this.usrLoc$;
  }

  private handleLocationError(browserHasGeolocation): void {
    window.alert(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
}

