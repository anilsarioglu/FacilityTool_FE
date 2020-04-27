import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MeldingService } from '../services/melding/melding.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  melding: any;
  meldingLijst: any = [];
  kopieLijstVanMeldingen: any = [];

  constructor(private ms: MeldingService, private alertCtrl: AlertController, private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.melding = this.activatedRoute.snapshot.params['melding'];
    this.lijstMeldingen();

  }

  initializeItems(): void {
    this.meldingLijst = this.kopieLijstVanMeldingen;
  }

  async searchItems(e) {
    console.log(this.meldingLijst);
    this.initializeItems();
    const val: string = e.target.value;

    if (!val) { return; }

    if (val.trim() !== '') {
      this.meldingLijst = this.kopieLijstVanMeldingen.filter((item) => {
        return (item.type.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.melder.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.datum.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.locatie.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.pNummer.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.status.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            //(item.categorie.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.beschrijving.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.locatiebeschr.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  lijstMeldingen() {
    this.ms.getAlleMeldingen().subscribe(data => {
      console.log(data);
      this.meldingLijst = data;
      this.kopieLijstVanMeldingen = this.meldingLijst;
    });
  }

  async addMelding() {
    console.log('addMelding');
    this.navCtrl.navigateForward('/melding');
  }

  detailMelding(data) {
    console.log('geklikt');
    // this.router.navigate(['/detail-melding'], data);
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(data)
      },

    });
  }

  async deleteMelding(i, e, id) {
    console.log(e);
    const event = e.currentTarget.innerText;

    const alert = await this.alertCtrl.create({
      header: 'Weet u zeker dat u deze melding wil verwijderen!',
      message: '' + event.toLowerCase(),
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            alert.dismiss().then(() => {
              this.ms.deleteMelding(id).subscribe();
              this.meldingLijst.splice(i, 1);
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
