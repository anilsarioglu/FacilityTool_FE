import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  token: string;

  public appMenu = [
    { title: 'Overzicht', url: '/tab1', icon: 'list' },
    { title: 'Mijn rapporteringen', url: '/my-reports', icon: 'bookmarks' },
    { title: 'Toegewezen rapporteringen', url: '/assigned-reports', icon: 'list-circle' },
    { title: 'Melding rapporteren', url: '/melding', icon: 'add-circle' },
    { title: 'Archief', url: '/archive', icon: 'library' },
    { title: 'Noodnummers', url: '/emergency', icon: 'call' },
    { title: 'Categorie beheer', url: '/category-manage', icon: 'hammer' },
    { title: 'Sjabloon beheer', url: '/mail-template-manage', icon: 'mail' },
    { title: 'Externe firma\'s', url: '/external-firm', icon: 'briefcase' },
    { title: 'Instellingen', url: '/tab3', icon: 'settings' }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {
    this.initializeApp();
  }

  ngOnInit() {
    const url = location.href;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      this.token = httpParams.get('token');
      localStorage.setItem('idToken', this.token);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


}
