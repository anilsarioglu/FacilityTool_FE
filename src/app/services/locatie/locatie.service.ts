import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Locatie } from './locatie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocatieService {

  //private url = "http://localhost:8100/assets/json/ell.json";
  private contentHeaders: HttpHeaders;

  locaties: Locatie[] = [];

  private AlleLocaties = "http://localhost:8080/getAllLocaties";

  private LocatiesCampus = "http://localhost:8080/findByCampus";
  private locatiesVerdieping = "http://localhost:8080/findByVerdieping";
  private locatiesLokaal = "http://localhost:8080/findByLokaal";
  private LocatiesNaam = "http://localhost:8080/findByNaam";

  private campus: String;
  private verdieping: number;
  private lokaal: String;
  private naam: String;


  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  }

  geefAlleLocaties(): Observable<Locatie[]> {
    return this.http.get<Locatie[]>(this.AlleLocaties, { headers: this.contentHeaders });
  }

  geefCampus(campus): Observable<Locatie[]> {
    return this.http.get<Locatie[]>(`${this.LocatiesCampus}/${campus}`, { headers: this.contentHeaders });
  }

  geefVerdieping(verdieping: number): Observable<Locatie[]> {
    return this.http.get<Locatie[]>(`${this.locatiesVerdieping}/${verdieping}`, { headers: this.contentHeaders });
  }

  geefLokaal(lokaal: String): Observable<Locatie[]> {
    return this.http.get<Locatie[]>(`${this.locatiesLokaal}/${lokaal}`, { headers: this.contentHeaders });
  }

  geefNaam(naam: String): Observable<Locatie[]> {
    return this.http.get<Locatie[]>(`${this.LocatiesNaam}/${naam}`, { headers: this.contentHeaders });
  }

}
