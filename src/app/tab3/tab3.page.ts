import { Component } from '@angular/core';
import { MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkMode: boolean = true;
  name: string = 'Amine Abdelfettah';
  pNumber: string = 'P103906';

  constructor(private authServive: MsalService) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  //azure log out
  logout() {
    this.authServive.logout();
  }


  cambio() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');

  }

}
