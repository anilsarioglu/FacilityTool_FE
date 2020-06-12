import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { User } from '../models/User';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.page.html',
  styleUrls: ['./user-manage.page.scss'],
})
export class UserManagePage implements OnInit {
  users: User[];
  userList: any[];
  copyListOfUsers: any[];

  constructor(private navCtrl: NavController, private router: Router,
    private http: HttpClient, private alertCtrl: AlertController, private fb: FormBuilder, private us: UserService,) {
  }

  ngOnInit() {
    this.initUsers();
  }

  initUsers(){
    this.us.getAllUsers().subscribe(data => {
      this.users = data;
      this.userList = this.users;
      this.copyListOfUsers = this.userList;
    });
  }

  ionViewWillEnter(){
    this.initUsers();
  }

  searchItems(e) {
    const val: string = e.target.value;

    this.copyListOfUsers = this.userList;
    if (val.trim() !== '') {
      this.copyListOfUsers = this.userList.filter((item) => {
        return (item.name.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
        (item.role.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  changeRole(data) {
    this.router.navigate(['/user-role'], {
      queryParams: {
        value: JSON.stringify(data)
      },
    });
  }

 async resetRole(id: string){
    const alert = await this.alertCtrl.create({
      header: 'Rol resetten!',
      message: 'Bent u zeker dat u de rol van deze user wil resetten naar "Medewerker"?',
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            alert.dismiss().then(() => {
              this.us.resetUserRole(id).subscribe();
              this.ngOnInit();
            });
            return false;
          }
        },
        { text: 'Nee' }
      ]
    });

    await alert.present();
  }
}

