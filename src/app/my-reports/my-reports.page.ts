import { Component, OnInit } from '@angular/core';
import {ReportService} from '../services/report/report.service';
import {EmployeeService} from '../services/employee/employee.service';
import {AlertController, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Report } from '../models/Report';
import {FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../services/location/location.service';
import {Location} from '../models/Location';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
})
export class MyReportsPage implements OnInit {

  report: Report;
  reportList: Report[] = [];
  reporterId: string;
  activeReport: Report;
  ishidden = true;
  reportState = '';
  reportType = '';
  reportDescr = '';
  reportLocDesc = '';
  reporterName = '';
  reportDate = '';
  reportLocatie: any;

  locaties: Location[];
  locatieLijst: any[];

  constructor(private ms: ReportService, private employeeService: EmployeeService, private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute,
              private ls: LocationService, private http: HttpClient) {
    this.reporterId = 'P103906';
    this.report = this.activatedRoute.snapshot.params.melding;
    this.listsInit();
  }
  ngOnInit() {
  }
  private listsInit() {
    this.ms.getAllReports().subscribe(data => {
      this.reportList = data;
      this.reportList = this.reportList.filter((item) => {
        return (item.pNumber.toString().toLowerCase().indexOf(this.reporterId.toLowerCase()) > -1 &&
            item.status.toString() !== 'GEANNULEERD');
      });
    });
    this.ls.getAllLocations().subscribe(data => {
      this.locaties = data;
      this.locatieLijst = this.locaties;
    });
  }

  cancelAndArchive(rep, i) {
    this.ms.putStatusReport(rep.id, 'GEANNULEERD').subscribe((report) => {
      rep.status = 'GEANNULEERD';
      this.reportList.splice(i, 1);
    });
  }

  editReport(rep) {
    this.activeReport = rep;
    this.reportDate = rep.date;
    this.reportType = rep.type;
    this.reporterName = rep.reporter + ' - ' + rep.pNumber;
    this.reportState = rep.status;
    this.reportDescr = rep.description;
    this.reportLocDesc = rep.locationDescription;
    this.reportLocatie = rep.location;
    this.ishidden = false;
  }

  uploadSubmit() {
    this.activeReport.type = this.reportType;
    this.activeReport.description = this.reportDescr;
    this.activeReport.locationDescription = this.reportLocDesc;
    this.activeReport.location = this.reportLocatie;

    this.ms.putReport(this.activeReport.id, this.activeReport).subscribe((report) => {
      console.log(report);
    });
    this.ishidden = true;
  }

  closeEdit() {
    this.ishidden = true;
  }

  chooseLoc(loc: any) {
    this.reportLocatie = loc;
  }
}
