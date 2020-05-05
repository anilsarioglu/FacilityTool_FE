import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MeldingService } from '../services/melding/melding.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Melding } from '../services/melding/melding';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  melding: any;
  meldingLijst: any = [];
  kopieLijstVanMeldingen: any = [];
  actieveLijstVanMeldingen: any = [];
  sortVal: any;
  toggle: boolean;

  constructor(private ms: MeldingService, private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.melding = this.activatedRoute.snapshot.params.melding;
    this.lijstMeldingen();
    this.sortVal = ' ';
  }

  lijstMeldingen() {
    this.ms.getAlleMeldingen().subscribe(data => {
      console.log(data);
      this.meldingLijst = data;
      this.activeList();
    });
  }

  async searchItems(e) {
    const val: string = e.target.value;

    this.activeList();
    if (val.trim() !== '') {
      this.kopieLijstVanMeldingen = this.actieveLijstVanMeldingen.filter((item) => {
        return (item.type.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.melder.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.datum.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.locatie.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.pNummer.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.status.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            // (item.categorie.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.beschrijving.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.locatiebeschr.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  async toggleOpdDef() {
    this.activeList();
  }

  activeList() {
    let ch;
    if (this.toggle) { ch = 'Defect'; } else { ch = 'Opdracht'; }
    this.actieveLijstVanMeldingen = this.meldingLijst;
    this.actieveLijstVanMeldingen = this.meldingLijst.filter((item) => {
      return (item.type.toString().toLowerCase().indexOf(ch.toLowerCase()) > -1) || item.type.toString() === '';
    });
    this.kopieLijstVanMeldingen = this.actieveLijstVanMeldingen;
  }

  sortAll() {
    this.kopieLijstVanMeldingen = this.kopieLijstVanMeldingen.sort((n1, n2) => {
      if (this.sortVal === 'datum') {
        // @ts-ignore
          return new Date(n1.datum) as any - new Date(n2.datum) as any;
      } else if (this.sortVal === 'type') {
        if (n1.type > n2.type) {
          return 1;
        }
        if (n1.type < n2.type) {
          return -1;
        }
        return 0;
      } else if (this.sortVal === 'locatie') {
        if (n1.locatie > n2.locatie) {
          return 1;
        }
        if (n1.locatie < n2.locatie) {
          return -1;
        }
        return 0;
      } else if (this.sortVal === 'status') {
        if (n1.status > n2.status) {
          return 1;
        }
        if (n1.status < n2.status) {
          return -1;
        }
        return 0;
      }
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
              this.kopieLijstVanMeldingen.splice(i, 1);
              window.location.reload();
            });
            return false;
          }
        },
        { text: 'Nee' }
      ]
    });
    this.activeList();
    await alert.present();
  }

  // Upvoting System
  onIconClick(melding: Melding, index: number) {
    this.melding = melding;
    console.log('Cliked on item ' + index);

    this.ms.upvoteMelding(this.melding.id).subscribe((updatedMelding) => {
      this.meldingLijst[index] = updatedMelding;
      this.lijstMeldingen();
      console.log(updatedMelding);
    });
  }

  downloadCSVFromJson = (filename, arrayOfJson) => {
    // convert JSON to CSV
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(arrayOfJson[0]);
    let csv = arrayOfJson.map(row => header.map(fieldName =>
        JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    // Create link and download
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  ExportJson() {
    this.downloadCSVFromJson('MeldingenLijst.csv', this.kopieLijstVanMeldingen);
  }

}
