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
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
})
export class MyReportsPage implements OnInit {

  report: Report;
  reportList: Report[] = [];
  // reporterId: string;
  username: any;
  userdata: any;
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

  constructor(private reportService: ReportService, private employeeService: EmployeeService, private userService: UserService , private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute,
              private ls: LocationService, private http: HttpClient) {
    // this.reporterId = 'P103906';
    this.userService.getUserDetails().subscribe(data => {
      this.userdata = data;
      this.username = localStorage.getItem('userName');
      // localStorage.setItem("userName", this.userdata["name"]);

    });

    this.report = this.activatedRoute.snapshot.params.melding;
    this.listsInit();
  }
  ngOnInit() {
  }
  private listsInit() {
    this.reportService.getAllReports().subscribe(data => {
      this.reportList = data;

      this.reportList = this.reportList.filter((item) => {
        // tslint:disable-next-line:triple-equals
        return (item.reporter == this.username &&
          item.status.toString() !== 'GEANNULEERD');
      });

    });

    this.ls.getAllLocations().subscribe(data => {
      this.locaties = data;
      this.locatieLijst = this.locaties;
    });
  }

  cancelAndArchive(rep, i) {
    this.reportService.putStatusReport(rep.id, 'GEANNULEERD').subscribe((report) => {
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

    this.reportService.putReport(this.activeReport.id, this.activeReport).subscribe((report) => {
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
