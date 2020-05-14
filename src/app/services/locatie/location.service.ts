import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Location } from '../../models/Location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  //private url = "http://localhost:8100/assets/json/ell.json";
  private contentHeaders: HttpHeaders;

  private urlLocations = "http://localhost:8080/locations/";
  private urlLocationsByCampus = "http://localhost:8080/locations/by-campus/";
  private urlLocationsByFloor = "http://localhost:8080/locations/by-floor/";
  private urlLocationsByRoom = "http://localhost:8080/locations/by-room/";
  private urlLocationsByName = "http://localhost:8080/locations/by-name/";

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.urlLocations, { headers: this.contentHeaders });
  }

  getLocationsByCampus(campus: string): Observable<Location[]> {
    return this.http.get<Location[]>(this.urlLocationsByCampus + campus, { headers: this.contentHeaders });
  }

  getLocationsByFloor(floor: number): Observable<Location[]> {
    return this.http.get<Location[]>(this.urlLocationsByFloor + floor, { headers: this.contentHeaders });
  }

  getLocationByRoom(room: string): Observable<Location> {
    return this.http.get<Location>(this.urlLocationsByRoom + room, { headers: this.contentHeaders });
  }

  getLocationsByName(name: string): Observable<Location[]> {
    return this.http.get<Location[]>(this.urlLocationsByName + name, { headers: this.contentHeaders });
  }
}
