import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';

import { MsalService, BroadcastService } from '@azure/msal-angular';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 

  constructor(private userService: UserService) { }

  async ngOnInit() {

  }

}
