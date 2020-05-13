import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Category } from '../../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private contentHeaders: HttpHeaders;

  private urlCategories = "http://localhost:8080/categories/";
  private urlCategoriesByName = "http://localhost:8080/categories/by-name/";

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlCategories, { headers: this.contentHeaders });
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.urlCategories, category, { headers: this.contentHeaders });
  }

  deleteCategory(name: String): Observable<{}> {
    return this.http.delete<{}>(this.urlCategoriesByName + name, { headers: this.contentHeaders });
  }
}
