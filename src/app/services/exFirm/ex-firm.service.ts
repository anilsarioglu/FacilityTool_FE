import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExternalFirm } from '../../models/ExternalFirm';

@Injectable({
  providedIn: 'root'
})
export class ExFirmService {

  private contentHeaders: HttpHeaders;

  // private VPSAPIBE = "https://vps100.ap.be/api/"
  // private urlExternalFirms = this.VPSAPIBE + "externalFirms";
  // private urlExternalFirmById = this.VPSAPIBE + "externalFirm/";

  private APIBE = 'http://localhost:8080/api/'
  private urlExternalFirms = this.APIBE + "externalFirms";
  private urlExternalFirmById = this.APIBE + "externalFirm/";

  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
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
