import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private contentHeaders: HttpHeaders;

  // private VPSAPIBE = "https://vps100.ap.be/api/";
  // private urlCategories = this.VPSAPIBE + 'categories/';
  // private urlCategoryByName = this.VPSAPIBE + 'categories/by-name/';

  private APIBE = 'http://localhost:8080/api/';
  private urlUser = this.APIBE + 'user/me';
  private urlUsers = this.APIBE + 'users';
  private urlChangeRole = this.APIBE + 'role/'
  // private urlResetRole = this.APIBE + 'role-delete/'

  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(this.urlUser, { headers: this.contentHeaders });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUsers, { headers: this.contentHeaders });
  }

  putUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(this.urlChangeRole + id, user, { headers: this.contentHeaders });
  }

  // resetUserRole(id: string): Observable<User> {
  //   return this.http.put<User>(this.urlResetRole + id, { headers: this.contentHeaders });
  // }
}
