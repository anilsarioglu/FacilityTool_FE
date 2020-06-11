import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MailTemplate } from '../../models/MailTemplate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService {
  private contentHeaders: HttpHeaders;

  // private VPSAPIBE = "https://vps100.ap.be/api/";
  // private urlMailTemplates = this.VPSAPIBE + "mail-templates/";
  // private urlMailTemplateByName = this.VPSAPIBE + "mail-templates/by-name/";

  private APIBE = 'http://localhost:8080/api/'
  private urlMailTemplates = this.APIBE +  "mail-templates/";
  private urlMailTemplateByName = this.APIBE + "mail-templates/by-name/";


  idToken: string;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem("idToken");
    this.contentHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken
    }).set('Content-Type', 'application/json');
  }

  getAllMailTemplates(): Observable<MailTemplate[]> {
    return this.http.get<MailTemplate[]>(this.urlMailTemplates, { headers: this.contentHeaders });
  }

  postMailTemplate(mailTemplate: MailTemplate): Observable<MailTemplate> {
    return this.http.post<any>(this.urlMailTemplates, mailTemplate, { headers: this.contentHeaders });
  }

  deleteMailTemplate(name: String): Observable<{}> {
    return this.http.delete<{}>(this.urlMailTemplateByName + name, { headers: this.contentHeaders });
  }
}
