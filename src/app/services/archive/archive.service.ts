import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Report } from '../../models/Report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private contentHeaders: HttpHeaders;


  // private VPSAPIBE = "https://vps100.ap.be/api/";
  // private urlArchive = this.VPSAPIBE + 'reports/archive/';

  private APIBE = 'http://localhost:8080/api/';
  private urlArchive = this.APIBE + 'reports/archive/';

  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
  }


  getAllDefects(): Observable<Report[]> {
    return this.http.get<Report[]>(this.urlArchive + "defect", { headers: this.contentHeaders });
  }

  getAllTasks(): Observable<Report[]> {
    return this.http.get<Report[]>(this.urlArchive + "task", { headers: this.contentHeaders });
  }
}