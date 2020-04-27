import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Melding } from './melding';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeldingService {


  private contentHeaders: HttpHeaders;
  meldingen: Melding[] = [];
  private urlMelding = "http://localhost:8080/melding";

  private urlAlleMeldingenOphalenJson = "http://localhost:8080/meldingJSON";

  private urlMeldingJsonFindByLocatie = "http://localhost:8080/meldingJSON/findByLocatie/";

  private urlMeldingDeleteById = "http://localhost:8080/meldingJSON/deleteById/";

  private urlFindById = "http://localhost:8080/meldingJSON/findById/";

  private urlMeldingUpvote = "http://localhost:8080/melding/upvote/";

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders();
    this.contentHeaders.set('Content-Type', 'application/json');

    // this.contentHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
    // this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/*');
    // this.contentHeaders.set('responseType', 'blob' as 'json')
  }

  postAlleMeldingen(data: Melding): Observable<Melding> {
    return this.http.post<any>(this.urlMelding, data, { headers: this.contentHeaders });
  }

  getAlleMeldingen(): Observable<Melding[]> {
    return this.http.get<any>(this.urlAlleMeldingenOphalenJson, { headers: this.contentHeaders });
  }

  getById(id): Observable<Melding[]> {
    return this.http.get<any>(this.urlFindById + id, { headers: this.contentHeaders });
  }

  getAlleLocatiesFromMeldingen(locatie: Melding): Observable<Melding[]> {
    return this.http.get<any>(this.urlMeldingJsonFindByLocatie + locatie, { headers: this.contentHeaders });
  }


  deleteMelding(id: Melding): Observable<Melding[]> {
    return this.http.get<any>(this.urlMeldingDeleteById + id, { headers: this.contentHeaders });
  }

  upvoteMelding(id: string) {
    return this.http.put<Melding>(this.urlMeldingUpvote + id, { headers: this.contentHeaders});
  }



}
