import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Category } from '../../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private contentHeaders: HttpHeaders;

  // private VPSAPIBE = "https://vps100.ap.be/api/";
  // private urlCategories = this.VPSAPIBE + 'categories/';
  // private urlCategoryByName = this.VPSAPIBE + 'categories/by-name/';

  private APIBE = 'http://localhost:8080/api/';
  private urlCategories = this.APIBE + 'categories/';
  private urlCategoryByName = this.APIBE + 'categories/by-name/';

  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlCategories, { headers: this.contentHeaders });
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<any>(this.urlCategories, category, { headers: this.contentHeaders });
  }

  deleteCategory(name: String): Observable<{}> {
    return this.http.delete<{}>(this.urlCategoryByName + name, { headers: this.contentHeaders });
  }
}
