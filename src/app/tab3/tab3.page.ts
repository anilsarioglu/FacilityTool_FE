import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkMode: boolean = true;
  name: string = 'Amine Abdelfettah';
  pNumber: string = 'P103906';

  constructor() {

  }

  //azure log out
  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }



}
