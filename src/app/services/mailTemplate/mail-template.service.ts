import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MailTemplate } from '../../models/MailTemplate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService {
  private contentHeaders: HttpHeaders;

  private urlMailTemplates = "http://localhost:8080/mail-templates/";
  private urlMailTemplateByName = "http://localhost:8080/mail-templates/by-name/";

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/JSON');
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
