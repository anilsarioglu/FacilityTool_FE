import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emergency } from '../../models/Emergency';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  private localUrl = "http://localhost:8100/assets/json/emergency.json";

  private contentHeaders: HttpHeaders;

  // private VPSAPIBE = "https://vps100.ap.be/api/";
  // private urlEmergencies = this.VPSAPIBE + "emergencies";
  // private urlEmergenciesById = this.VPSAPIBE + "emergencies/";

  private APIBE = 'http://localhost:8080/api/';
  private urlEmergencies = this.APIBE + "emergencies";
  private urlEmergenciesById = this.APIBE + "emergencies/";

  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
  }

  getAllLocalEmergencies(): Observable<Emergency[]> {
    return this.http.get<Emergency[]>(this.localUrl, { headers: this.contentHeaders });
  }

  getAllEmergencies(): Observable<Emergency[]> {
    return this.http.get<Emergency[]>(this.urlEmergencies, { headers: this.contentHeaders });
  }


  putEmergency(id: string, emergency: Emergency): Observable<Emergency> {
    return this.http.put<Emergency>(this.urlEmergenciesById + id, emergency, { headers: this.contentHeaders });
  }

  deleteEmergencyById(id: string): Observable<{}> {
    return this.http.delete<{}>(this.urlEmergenciesById + id, { headers: this.contentHeaders });
  }


}
