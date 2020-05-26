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
    {title: 'Overzicht', url: '/tab1', icon: 'list'},
    {title: 'Melding rapporteren', url: '/melding', icon: 'add'},
    {title: 'Archive', url: '/test3', icon: 'archive'},
    {title: 'Noodnummers', url: '/test3', icon: 'call'},
    {title: 'Categorie beheer', url: '/category-manage', icon: 'hammer'},
    {title: 'Instellingen', url: '/tab3', icon: 'settings'}
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
      this.checkDarkTheme();
    });
  }

  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) document.body.classList.toggle('dark');
  }
}
