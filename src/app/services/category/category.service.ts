import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Category } from '../../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private contentHeaders: HttpHeaders;

  private allCategoriesURL = "http://localhost:8080/getAllCategories";
  private postCategoryURL = "http://localhost:8080/addCategory";
  private deleteCategoryURL = "http://localhost:8080/category/deleteByName/";

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/JSON');
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.allCategoriesURL, { headers: this.contentHeaders });
  }

  postCategory(data: Category): Observable<Category> {
    return this.http.post<any>(this.postCategoryURL, data, { headers: this.contentHeaders });
  }

  deleteCategory(name: String): Observable<String[]> {
    return this.http.get<any>(this.deleteCategoryURL + name, { headers: this.contentHeaders });
  }
}
