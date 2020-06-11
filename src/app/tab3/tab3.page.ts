import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { UserService } from '../services/user/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkMode: boolean = true;
  name: string = 'Amine Abdelfettah';
  pNumber: string = 'P103906';
  userdata: any;
  naam:string;
  email:string;
  //user: User; 

  constructor(private userservice: UserService) {
    this.userservice.getUserDetails().subscribe(data => {
     this.userdata = data;
     console.log(this.userdata); 

     this.naam = data["name"];
     this.email = data["email"]

    //  this.userdata = JSON.stringify(data); 
    }); 
  }

  //azure log out
  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }




}
