import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MeldingService } from '../services/melding/melding.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  melding: any;
  meldingLijst: any = [];
  kopieLijstVanMeldingen: any = [];

  constructor(private ms: MeldingService, private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.melding = this.activatedRoute.snapshot.params['melding'];
    this.lijstMeldingen();
  }


  lijstMeldingen() {
    this.ms.getAlleMeldingen().subscribe(data => {
      console.log(data);
      this.meldingLijst = data;
      this.kopieLijstVanMeldingen = this.meldingLijst;
    });
  }

  async addMelding() {
    console.log("addMelding");
    this.navCtrl.navigateForward("/melding")
  }

  detailMelding(data) {
    console.log("geklikt");
    // this.router.navigate(['/detail-melding'], data);
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(data)
      },

    });
  }


}
