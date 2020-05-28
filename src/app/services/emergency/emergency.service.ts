import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emergency } from '../../models/Emergency';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  private contentHeaders: HttpHeaders;

  private urlEmergencies = "http://localhost:8080/emergencies";
  private urlEmergenciesById = "http://localhost:8080/emergencies/";

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllEmergencies(): Observable<Emergency[]> {
    return this.http.get<Emergency[]>(this.urlEmergencies, { headers: this.contentHeaders });
  }

  // getEmergencyById(id: string): Observable<Emergency> {
  //   return this.http.get<Emergency>(this.urlEmergenciesById + id, { headers: this.contentHeaders });
  // }

  putEmergency(id: string, emergency: Emergency): Observable<Emergency> {
    return this.http.put<Emergency>(this.urlEmergenciesById + id, emergency, { headers: this.contentHeaders });
  }

  deleteEmergencyById(id: string): Observable<{}> {
    return this.http.delete<{}>(this.urlEmergenciesById + id, { headers: this.contentHeaders });
  }


}
