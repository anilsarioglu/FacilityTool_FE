import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Report } from '../../models/Report';
import { Reaction } from '../../models/Reaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private contentHeaders: HttpHeaders;


  // private VPSAPIBE = "https://vps100.ap.be/api/";
  // private urlReports = this.VPSAPIBE + 'reports/';
  // private urlReportsByLocation = this.VPSAPIBE + 'reports/by-location/';
  // private urlReportsById = this.VPSAPIBE + 'by-id/';
  // private urlToggleUpvote = this.VPSAPIBE + 'reports/upvote/';
  // private urlReactions = this.VPSAPIBE + 'reports/reactions/';
  // private urlStatus = this.VPSAPIBE + 'reports/status/';

  private APIBE = 'http://localhost:8080/api/';
  private urlReports = this.APIBE + 'reports/';
  private urlReportsByLocation = this.APIBE + 'reports/by-location/';
  private urlReportsById = this.APIBE + 'reports/by-id/';
  private urlToggleUpvote = this.APIBE + 'reports/upvote/';
  private urlReactions = this.APIBE + 'reports/reactions/';
  private urlStatus = this.APIBE + 'reports/status/';

  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
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
    return this.http.put<Report>(this.urlToggleUpvote + id, { headers: this.contentHeaders });
  }

  putStatusReport(id: string, status: string): Observable<Report> {
    return this.http.put<Report>(this.urlStatus + id, status, { headers: this.contentHeaders });
  }
}
