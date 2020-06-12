import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { ReportService } from '../services/report/report.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Report } from '../models/Report';
import {formatDate} from '@angular/common';
import { Employee } from '../models/Employee';
// xlxs
import * as XLSX from 'xlsx';
// azure
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
  // user info
  userdata: any;
  usernaam: String;
  userId: string;
  melding: any;
  meldingLijst: any = [];
  kopieLijstVanMeldingen: any = [];
  actieveLijstVanMeldingen: any = [];
  sortVal: string = 'locatie';
  toggle: boolean;
  segment: string;
  // Assign Defect
  selectEmployeePlaceholder: string = 'Kies technische werknemer(s)';
  disableToewijzenButton: boolean = false;
  hideMe = {};
  technicalEmployees: User[];
  selectedEmployeeIds: string[] = [];
  reportIndex: number[] = [];
  isEnabled: boolean = true;
  annuleerOrSluitenText: string = 'Annuleer';
  pincolor: any;
  fileName = 'ExcelSheet.xlsx';
  didUpvote: boolean[] = [];
  
  constructor(private ms: ReportService, private userService: UserService, private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
    this.melding = this.activatedRoute.snapshot.params.melding;
    this.lijstMeldingen();
    this.hideMe = {};

    this.userService.getUserDetails().subscribe(data => {
      this.userdata = data;
      this.userId = data.id;
      console.log(this.userdata);
      this.usernaam = data['name'];
      this.checkDidUpvote();
    });
  }
  ngOnInit() {}

  lijstMeldingen() {
    this.ms.getAllReports().subscribe(data => {
      this.meldingLijst = data;
      this.activeList();
    });
  }

  ionViewWillEnter() {
    this.lijstMeldingen();
    this.segment = 'defect';
    this.sortVal = 'prioriteit';
  }

  checkDidUpvote() {
    for (let i = 0; i < this.meldingLijst.length; i++) {
        this.didUpvote[i] = this.meldingLijst[i].upVotedByIds.includes(this.userId);
    }
  }

  segmentChanged(event: any) {
    this.activeList();
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
            // (item.pNumber.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.status.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.category.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.description.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
            (item.locationDescription.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  activeList() {
    this.actieveLijstVanMeldingen = this.meldingLijst;
    this.actieveLijstVanMeldingen = this.meldingLijst.filter((item) => {
      return (item.type === null || item.type.toString().trim().toLowerCase() === this.segment);
    });
    this.kopieLijstVanMeldingen = this.actieveLijstVanMeldingen;
    this.sortAll();
  }

  sortAll() {
    this.kopieLijstVanMeldingen = this.kopieLijstVanMeldingen.sort((n1, n2) => {
      if (this.sortVal === 'datum') {
        // @ts-ignore
          return new Date(n2.date) as any - new Date(n1.date) as any;
      } else if (this.sortVal === 'prioriteit') {
        if (n1.numberUpvotes < n2.numberUpvotes) {
          return 1;
        }
        if (n1.numberUpvotes > n2.numberUpvotes) {
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
    this.navCtrl.navigateForward('/melding');
  }

  detailMelding(data) {
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(data)
      },
    });
  }

  async deleteMelding(i, e, ml) {
    const event = e.currentTarget.innerText;
    const alert = await this.alertCtrl.create({
      header: 'Weet u zeker dat u deze melding wil verwijderen?',
      message: '' + event.toLowerCase(),
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            alert.dismiss().then(() => {
              this.ms.deleteReportById(ml.id).subscribe();
              this.activeList();
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

  // Assign Defect
  onAssignClick(reportId: string, i: number) {
    this.selectEmployeePlaceholder = 'Kies technische werknemer(s)';
    this.userService.getAllUsers().subscribe(employees => {
      // console.log(employees);
      this.technicalEmployees = employees;
      for (let employee of this.technicalEmployees) {
        if (employee.assignedReportsId.includes(reportId)) {
          this.selectedEmployeeIds.push(employee.id);
          this.selectEmployeePlaceholder = 'Al toegewezen aan ';
          this.selectEmployeePlaceholder = this.selectEmployeePlaceholder + employee.name + ' ';
        }
      }
    });
    this.hideMe[reportId] = !this.hideMe[reportId];
    this.disableToewijzenButton = true;
    this.isEnabled = false;
    this.annuleerOrSluitenText = 'Annuleer';
  }

  onCancelOrCloseClick(reportId: string) {
    this.hideMe[reportId] = !this.hideMe[reportId];
    this.selectedEmployeeIds = [];
    this.isEnabled = true;
  }

  async onToewijzenClick(reportId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Bevestiging nodig ...',
      message: 'De geselecteerde medewerkers zullen een melding krijgen',
      buttons: [
        {
          text: 'Annuleer',
          role: 'cancel'
        }, {
          text: 'Bevestig',
          handler: () => {
            for (const employeeId of this.selectedEmployeeIds) {
              this.userService.postReportToUser(employeeId, reportId).subscribe(reportId => {
                console.log(reportId);
              });
              this.disableToewijzenButton = true;
              this.annuleerOrSluitenText = 'Sluiten';
          }
          }
        }
      ]
    });
    await alert.present();
  }

  onAssignToChange() {
    this.disableToewijzenButton = false;
  }

  // UpVote
  onIconClick(melding: Report, index: number) {
    this.melding = melding;
    this.ms.putUpvoteReport(this.melding.id, this.userdata.id).subscribe((updatedMelding) => {
      this.meldingLijst[index] = updatedMelding;
      this.checkDidUpvote()
      this.lijstMeldingen();
    });
  }

  exportExcel(): void {
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

     // toevoegen aan worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // bestand opslaan
    XLSX.writeFile(wb, this.fileName);
  }

  doRefresh(event) {
    this.lijstMeldingen();
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  colorStatus(data) {
    switch (data.toString().toUpperCase()) {
      case 'IN_BEHANDELING':
        return 'green';
      case 'IN_WACHT':
        return 'orange';
      default:
        return 'grey';
    }
  }
}
