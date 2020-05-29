import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { ReportService } from '../services/report/report.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Report } from '../models/Report';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  constructor(private ms: ReportService, private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.melding = this.activatedRoute.snapshot.params.melding;
    this.lijstMeldingen();
    this.sortVal = ' ';
  }

  melding: any;
  meldingLijst: any = [];
  kopieLijstVanMeldingen: any = [];
  actieveLijstVanMeldingen: any = [];
  sortVal: any;
  toggle: boolean;
  pincolor: any;

  lijstMeldingen() {
    this.ms.getAllReports().subscribe(data => {
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
            (item.reporter.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.date.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.location.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.pNumber.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.status.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            // (item.categorie.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.description.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.locationDescription.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
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
          return new Date(n1.date) as any - new Date(n2.date) as any;
      } else if (this.sortVal === 'type') {
        if (n1.type > n2.type) {
          return 1;
        }
        if (n1.type < n2.type) {
          return -1;
        }
        return 0;
      } else if (this.sortVal === 'locatie') {
        if (n1.location > n2.location) {
          return 1;
        }
        if (n1.location < n2.location) {
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

  async deleteMelding(i, e, ml) {
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
              this.ms.deleteReportById(ml.id).subscribe();
              this.kopieLijstVanMeldingen.splice(i, 1);
            });
            this.meldingLijst.splice(this.meldingLijst.indexOf(ml), 1);
            this.actieveLijstVanMeldingen.splice(this.actieveLijstVanMeldingen.indexOf(ml), 1);
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
  onIconClick(melding: Report, index: number) {
    this.melding = melding;
    console.log('Cliked on item ' + index);

    this.ms.putUpvoteReport(this.melding.id).subscribe((updatedMelding) => {
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

  ionViewWillEnter() {
    this.kopieLijstVanMeldingen.splice();
  }

  doRefresh(event) {
    this.lijstMeldingen();
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  colorStatus(data) {
    switch (data.toString().toUpperCase()) {
      case 'IN_UITVOERING':
      case 'IN_BEHANDELING':
        return 'yellow';
      case 'VOLTOOID':
      case 'GOED_GEKEURD':
        return 'green';
      case 'GEANNULEERD':
      case 'BEËINDIGD':
        return 'red';
      case 'GEARCHIVEERD':
      case 'IN_WACHT':
        return 'orange';
      default:
        return 'grey';
    }
  }
}
