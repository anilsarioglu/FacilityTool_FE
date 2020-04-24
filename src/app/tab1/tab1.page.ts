import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  melding: any;

  constructor(private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute) {

    this.melding = this.activatedRoute.snapshot.params['melding'];
  }


  async addMelding() {
    console.log("addMelding");
    this.navCtrl.navigateForward("/melding")
  }


}
