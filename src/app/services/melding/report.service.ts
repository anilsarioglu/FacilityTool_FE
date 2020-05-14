import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Report } from '../../models/Report';
import { Reaction } from '../../models/Reaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MeldingService {
  private contentHeaders: HttpHeaders;

  private urlReports = "http://localhost:8080/reports/";
  private urlReportsByLocation = "http://localhost:8080/reports/by-location/";
  private urlReportsById = "http://localhost:8080/reports/by-id/";
  private urlToggleUpvote = "http://localhost:8080/reports/upvote/";
  private urlReactions = 'http://localhost:8080/reports/reactions/';

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  postReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.urlReports, report, { headers: this.contentHeaders });
  }

  postReaction(id: string, reaction: Reaction): Observable<Reaction> {
    return this.http.post<Reaction>(this.urlReactions + id, reaction, { headers: this.contentHeaders });
  }

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.urlReports, { headers: this.contentHeaders });
  }

  getReportById(id: string): Observable<Report> {
    return this.http.get<Report>(this.urlReportsById + id, { headers: this.contentHeaders });
  }

  getReportsByLocation(location: string): Observable<Report[]> {
    return this.http.get<Report[]>(this.urlReportsByLocation + location, { headers: this.contentHeaders });
  }

  deleteReportById(id: string): Observable<{}> {
    return this.http.delete<{}>(this.urlReports + id, { headers: this.contentHeaders });
  }

  putUpvoteReport(id: string): Observable<Report> {
    return this.http.put<Report>(this.urlToggleUpvote + id, { headers: this.contentHeaders});
  }
}
