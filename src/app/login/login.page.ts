import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessage: string;

  constructor(private authService: AuthenticationService, private navCtrl: NavController, private loadingController: LoadingController,private router: Router) { }

  async ngOnInit() {
    // If coming back after logging into Auth0,
    // and using CURRENT Implicit (web) Login
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndictator();
      try {
        // await this.authService.handleCallback(window.location.href);
      } catch (e) {
        this.errorMessage = e.message;
      } finally {
        loadingIndicator.dismiss();
      }
    }
  }

  async login() {
    const loadingIndicator = await this.showLoadingIndictator();
    try {
      await this.authService.onLoginSuccess();
      // await this.authService.login();
    } catch (e) {
      console.log(`caught error ${e.message}`);
    } finally {
      loadingIndicator.dismiss();
      this.navCtrl.navigateForward('/tab1');
    }
  }
  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Verbinden met Azure...'
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}

