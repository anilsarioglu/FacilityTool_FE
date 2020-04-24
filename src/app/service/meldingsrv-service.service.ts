import { Injectable } from '@angular/core';
//import { Melding } from '../melding/melding';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeldingsrvServiceService {
  private contentHeaders: HttpHeaders;
  
  //meldingen: Melding[] = [];

  constructor() { }
}
