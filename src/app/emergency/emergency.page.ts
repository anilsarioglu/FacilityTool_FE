import { Component, OnInit } from '@angular/core';
import { EmergencyService } from '../services/emergency/emergency.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {

  emergencyList: any = [];

  constructor(private es: EmergencyService, private alertCtrl: AlertController, private router: Router) {
    this.listEmergencies();
  }

  ngOnInit() {
  }


  listEmergencies() {
    this.es.getAllEmergencies().subscribe(data => {
      console.log(data);
      this.emergencyList = data;
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
