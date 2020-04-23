import { Injectable } from '@angular/core';
//import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private router: Router;

  constructor(platform: Platform, router: Router) {
    
    this.router = router;
  }


  async onLoginSuccess() {
    this.router.navigate(['/app/tabs/tab1'])
  }

  onLogout() {
    this.router.navigate(['app/login']);
  }
}