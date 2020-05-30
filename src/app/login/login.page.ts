import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';

import { MsalService, BroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessage: string;
  requestObj = {
    scopes: ["user.read"]
  };

  constructor(private authService1: AuthenticationService, private navCtrl: NavController, private loadingController: LoadingController,private router: Router, private broadcastService: BroadcastService, private authService: MsalService) { }

  async ngOnInit() {
    // If coming back after logging into Auth0,
    // and using CURRENT Implicit (web) Login
    // if (window.location.hash) {
    //   const loadingIndicator = await this.showLoadingIndictator();
    //   try {
    //     // await this.authService.handleCallback(window.location.href);
    //   } catch (e) {
    //     this.errorMessage = e.message;
    //   } finally {
    //     loadingIndicator.dismiss();
    //   }
    // }
  }
  

  async login() {
    //const loadingIndicator = await this.showLoadingIndictator();
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

        if (!isIE) {
          this.authService.loginRedirect({
            extraScopesToConsent: ["user.read", "openid", "profile"]
          });
          this.authService.acquireTokenSilent(this.requestObj).then(function (tokenResponse) {
            // Callback code here
            console.log(tokenResponse.accessToken);
        }).catch(function (error) {
            console.log(error);
        });
        
        } else {
          this.authService.loginPopup({
            extraScopesToConsent: ["user.read", "openid", "profile"]
          });
          this.authService.acquireTokenPopup(this.requestObj).then(function (tokenResponse) {
          
            console.log(tokenResponse.accessToken);
        }).catch(function (error) {
            console.log(error);
        });
        }
  }
  
  // private async showLoadingIndictator() {
  //   const loadingIndicator = await this.loadingController.create({
  //     message: 'Verbinden met Azure...'
  //   });
  //   await loadingIndicator.present();
  //   return loadingIndicator;
  // }
}