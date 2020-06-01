import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExternalFirm } from '../../models/ExternalFirm';

@Injectable({
  providedIn: 'root'
})
export class ExFirmService {

  private contentHeaders: HttpHeaders;

  private urlExternalFirms = "http://localhost:8080/externalFirms";
  private urlExternalFirmById = "http://localhost:8080/externalFirm/";

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  postExternalFirm(externalFirm: ExternalFirm): Observable<ExternalFirm> {
    return this.http.post<ExternalFirm>(this.urlExternalFirms, externalFirm, { headers: this.contentHeaders });
  }

  getAllExternalFirms(): Observable<ExternalFirm[]> {
    return this.http.get<ExternalFirm[]>(this.urlExternalFirms, { headers: this.contentHeaders });
  }


  putExternalFirm(id: string, externalFirm: ExternalFirm): Observable<ExternalFirm> {
    return this.http.put<ExternalFirm>(this.urlExternalFirmById + id, externalFirm, { headers: this.contentHeaders });
  }

  deleteExternalFirmById(id: string): Observable<{}> {
    return this.http.delete<{}>(this.urlExternalFirmById + id, { headers: this.contentHeaders });
  }

}
