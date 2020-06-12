import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import { Report } from 'src/app/models/Report';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private contentHeaders: HttpHeaders;

  // private VPSAPIBE = "https://vps100.ap.be/api/";
  // private urlUsers = this.VPSAPIBE + 'users';
  // private urlUser = this.VPSAPIBE + 'users/me';
  // private urlChangeRole = this.VPSAPIBE + 'users/';
  // private urlResetRole = this.VPSAPIBE + 'users/';

  private APIBE = 'http://localhost:8080/api/';
  private urlUsers = this.APIBE + 'users';
  private urlUser = this.APIBE + 'users/me';
  private urlAssignedReports = this.APIBE + 'users/'
  private urlChangeRole = this.APIBE + 'users/';
  private urlResetRole = this.APIBE + 'users/';
  private urlAddReportToUser = this.APIBE + this.urlUsers + '/';
  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUsers, { headers: this.contentHeaders });
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(this.urlUser, { headers: this.contentHeaders });
  }

  getAssignedReports(userId: string): Observable<Report[]> {
    return this.http.get<Report[]>(this.urlAssignedReports + userId + '/reports', { headers: this.contentHeaders });
  }

  postReportToUser(userId: string, reportId: string): Observable<Report> {
    return this.http.post<Report>(this.urlAddReportToUser + userId + '/reports', reportId, { headers: this.contentHeaders });
  }

  putUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(this.urlChangeRole + id + '/role', user, { headers: this.contentHeaders });
  }

  resetUserRole(id: string): Observable<User> {
    return this.http.put<User>(this.urlResetRole + id + '/delete-role', id, { headers: this.contentHeaders });
  }
}
