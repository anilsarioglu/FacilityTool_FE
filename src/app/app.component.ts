import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appMenu = [
    { title: 'Overzicht', url: '/tab1', icon: 'list' },
    { title: 'Melding rapporteren', url: '/melding', icon: 'add' },
    { title: 'Archief', url: '/test3', icon: 'archive' },
    { title: 'Noodnummers', url: '/emergency', icon: 'call' },
    { title: 'Categorie beheer', url: '/category-manage', icon: 'hammer' },
<<<<<<< HEAD
    { title: 'Sjabloon beheer', url: '/mail-template-manage', icon: 'mail' },
=======
    { title: "Externe firma's", url: '/external-firm', icon: 'briefcase' },
>>>>>>> TPG9-FE-32-exFirms
    { title: 'Instellingen', url: '/tab3', icon: 'settings' }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    //private authService: MsalService

  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.checkDarkTheme();
    });
  }

  // checkDarkTheme() {
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  //   if (prefersDark.matches) document.body.classList.toggle('dark');
  // }
}
