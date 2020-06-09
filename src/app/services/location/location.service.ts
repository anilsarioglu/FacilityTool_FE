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


  private VPSAPIBE = "https://vps100.ap.be/api/"
  private urlLocations = this.VPSAPIBE + "locations/";
  private urlLocationsByCampus = this.VPSAPIBE + "locations/by-campus/";
  private urlLocationsByFloor = this.VPSAPIBE + "locations/by-floor/";
  private urlLocationsByRoom = this.VPSAPIBE + "locations/by-room/";
  private urlLocationsByName = this.VPSAPIBE + "locations/by-name/";

  // private APIBE = 'http://localhost:8080/api/'
  // private urlLocations = this.APIBE + "locations/";
  // private urlLocationsByCampus = this.APIBE + "locations/by-campus/";
  // private urlLocationsByFloor = this.APIBE + "locations/by-floor/";
  // private urlLocationsByRoom = this.APIBE + "locations/by-room/";
  // private urlLocationsByName = this.APIBE + "locations/by-name/";


  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
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
