import { Component, OnInit } from '@angular/core';
import { EmergencyService } from '../services/emergency/emergency.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {

  emergencyList: any = [];

  constructor(private storage: Storage, private es: EmergencyService, private alertCtrl: AlertController, private router: Router) {
    this.listEmergencies();
  }

  ngOnInit() {
    this.listEmergencies();
  }

  doRefresh(event) {
    this.listEmergencies();
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  ionViewWillEnter(){
    this.listEmergencies();
  }

  listEmergencies() {
    this.es.getAllEmergencies().subscribe(data => {
      console.log(data);
      this.emergencyList = data;
      this.storage.set("emergency", this.emergencyList);
    });
  }

  async deleteEmergency(i, e, id) {
    console.log(e);
    const event = e.currentTarget.innerText;

    const alert = await this.alertCtrl.create({
      header: 'Weet u zeker dat u deze noodnummer wil verwijderen!',
      message: '' + event.toLowerCase(),
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            alert.dismiss().then(() => {
              this.es.deleteEmergencyById(id).subscribe();
              this.emergencyList.splice(i, 1);
            });
            return false;
          }
        },
        { text: 'Nee' }
      ]
    });
    await alert.present();
  }


  changeEmergency(data) {
    console.log('geklikt');
    this.router.navigate(['/detail-emergency'], {
      queryParams: {
        value: JSON.stringify(data)
      },
    });
  }

}
