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

}
