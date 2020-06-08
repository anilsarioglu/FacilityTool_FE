import { Component, OnInit } from '@angular/core';
import {ReportService} from '../services/report/report.service';
import {EmployeeService} from '../services/employee/employee.service';
import {AlertController, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
})
export class MyReportsPage implements OnInit {

  report: any;
  reportList: any = [];
  reporterId: string;
  private activeReport: any;

  constructor(private ms: ReportService, private employeeService: EmployeeService, private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
    this.reporterId = 'P103902';

    this.report = this.activatedRoute.snapshot.params.melding;
    this.listsInit(); }

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
  }

  cancelAndArchive(rep, i) {
    this.ms.putStatusReport(rep.id, 'GEANNULEERD').subscribe((report) => {
      rep.status = 'GEANNULEERD';
      this.reportList.splice(i, 1);
    });
  }

  editReport(rep) {
    this.activeReport = rep;
  }
}
