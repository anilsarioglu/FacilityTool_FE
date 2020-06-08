import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { ReportService } from '../services/report/report.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Report } from '../models/Report';
import {formatDate} from '@angular/common';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee/employee.service';
//xlxs
import * as XLSX from 'xlsx';
//azure
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
//azure
 profile: any;
 graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";

  melding: any;
  meldingLijst: any = [];
  kopieLijstVanMeldingen: any = [];
  actieveLijstVanMeldingen: any = [];
  sortVal: string = "locatie";
  toggle: boolean;
  // Assign Defect
  selectEmployeePlaceholder: string = "Kies technische werknemer(s)";
  disableToewijzenButton: boolean = false;
  hideMe = {};
  employees: Employee[];
  selectedEmployeeIds: string[] = [];
  reportIndex: number[] = [];
  isEnabled:boolean = true;
  annuleerOrSluitenText: string = "Annuleer";

  pincolor: any;

  constructor(private ms: ReportService, private employeeService: EmployeeService, private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
    this.melding = this.activatedRoute.snapshot.params.melding;
    this.lijstMeldingen();
    this.sortVal = ' ';
    this.hideMe = {};
  }

  ionViewWillEnter() {
    this.lijstMeldingen();
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
    //this.selectedEmployeeIds = [];
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
      header: 'Weet u zeker dat u deze melding wil verwijderen?',
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

  // Assign Defect
  onAssignClick(reportId: string) {
    this.selectEmployeePlaceholder = "Kies technische werknemer(s)";
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      for (let employee of this.employees) {
        if (employee.assignedReportsId.includes(reportId)) {
          this.selectedEmployeeIds.push(employee.id);
          this.selectEmployeePlaceholder = "Al toegewezen aan ";
          this.selectEmployeePlaceholder = this.selectEmployeePlaceholder + employee.name + " ";
        }
      }
    });

    this.hideMe[reportId] = !this.hideMe[reportId]
    this.disableToewijzenButton = true;
    this.isEnabled = false;
    this.annuleerOrSluitenText = "Annuleer";
  }

  onCancelOrCloseClick(reportId: string) {
    this.hideMe[reportId] = !this.hideMe[reportId];
    this.selectedEmployeeIds = [];
    this.isEnabled = true;
  }

  async onToewijzenClick(reportId: String) {
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
            console.log(this.selectedEmployeeIds);
            for (let employeeId of this.selectedEmployeeIds) {
              this.employeeService.postReportIdToEmployee(employeeId, reportId).subscribe(reportId => {
                console.log(reportId);
              });
            this.disableToewijzenButton = true;
            this.annuleerOrSluitenText = "Sluiten";
          }
          }
        }
      ]
    });
    await alert.present();
  }

  onAssignToChange () {
    this.disableToewijzenButton = false;
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


  fileName= 'ExcelSheet.xlsx';  
    
  exportExcel(): void 
      {
          /* table id is passed over here */   
          let element = document.getElementById('excel-table'); 
        
        
            const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
          /* generate workbook and add the worksheet */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
        //  /* save to file */
          XLSX.writeFile(wb, this.fileName);
        
      }

  ngOnInit() {
    // this.getProfile();
  }
 // azure profile
//  getProfile() {
//   this.http.get(this.graphMeEndpoint).toPromise()
//     .then(profile => {
//       this.profile = profile;
//     });
// }

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
