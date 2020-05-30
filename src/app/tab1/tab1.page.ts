import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { ReportService } from '../services/report/report.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Report } from '../models/Report';
import {formatDate} from '@angular/common';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee/employee.service';

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
  // Assign Defect
  assignText: string = "Toewijzen aan:";
  hideMe = {};
  employees: Employee[];
  selectedEmployeeIds: string[] = [];

  constructor(private ms: ReportService, private employeeService: EmployeeService, private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute) {
    this.melding = this.activatedRoute.snapshot.params.melding;
    this.lijstMeldingen();
    this.sortVal = ' ';
    this.hideMe = {};
  }

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

  async deleteMelding(i, e, id) {
    console.log(e);
    const event = e.currentTarget.innerText;

    const alert = await this.alertCtrl.create({
      header: 'Weet u zeker dat u deze melding wil verwijderen?',
      message: '' + event.toLowerCase(),
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            alert.dismiss().then(() => {
              this.ms.deleteReportById(id).subscribe();
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

  // Assign Defect
  onAssignClick(reportId: string) {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
    this.hideMe[reportId] = !this.hideMe[reportId]
  }

  onEmptyClick(report: Report) {
    this.hideMe[report.id] = !this.hideMe[report.id];
    this.selectedEmployeeIds = [];
  }

  async onToewijzenClick(report: Report) {
    const alert = await this.alertCtrl.create({
      header: 'Bevestiging gevraagd!',
      message: 'De geselecteerde medewerkers zullen een melding krijgen',
      buttons: [
        {
          text: 'Annuleer',
          role: 'cancel'
        }, {
          text: 'Bevestig',
          handler: () => {
            console.log(this.selectedEmployeeIds);
            for (let employeeId of this.selectedEmployeeIds) {
              this.employeeService.postReportToEmployee(employeeId, report).subscribe(report => {
                console.log(report);
              });
            this.assignText = "Toegewezen aan:";
          }
          }
        }
      ]
    });
    await alert.present();
  }

  // Upvoting
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
}
