import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Report } from '../../models/Report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private contentHeaders: HttpHeaders;

  private urlArchive = 'http://localhost:8080/reports/archive/';

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllDefects(): Observable<Report[]> {
    return this.http.get<Report[]>(this.urlArchive + "/defect", { headers: this.contentHeaders });
  }

  getAllTasks(): Observable<Report[]> {
    return this.http.get<Report[]>(this.urlArchive + "/task", { headers: this.contentHeaders });
  }
}