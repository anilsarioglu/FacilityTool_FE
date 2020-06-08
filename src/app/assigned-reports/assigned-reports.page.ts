import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { Report } from '../models/Report';
import { EmployeeService } from '../services/employee/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assigned-reports',
  templateUrl: './assigned-reports.page.html',
  styleUrls: ['./assigned-reports.page.scss'],
})
export class AssignedReportsPage implements OnInit {

  employee: Employee; 
  report: Report;
  reportlist: any = []; 
  copyReportlist: any = []; 
  activeReportlist: any = []; 
  sortVal: any;
  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.listReports(); 
    this.sortVal = ' ';
  }

  ngOnInit() {
  }

  listReports() {
    this.employeeService.getAllReports("5ed60eb1c1913518bf7f2c90").subscribe(data => {
      console.log(data);
      this.reportlist = data;
    });
  }

  detailReport(data) {
    console.log('geklikt');
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(data)
      },
    });
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
  activeList() {
    let ch;
    this.activeReportlist = this.reportlist;
    this.activeReportlist = this.reportlist.filter((item) => {
      return (item.type.toString().toLowerCase().indexOf(ch.toLowerCase()) > -1) || item.type.toString() === '';
    });
    this.copyReportlist = this.activeReportlist;
  }
  //search in list
  async searchItems(e) {
    const val: string = e.target.value;

    this.activeList();
    if (val.trim() !== '') {
      this.copyReportlist = this.activeReportlist.filter((item) => {
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

  sortAll() {
    this.copyReportlist = this.copyReportlist.sort((n1, n2) => {
      if (this.sortVal === 'datum') {
        // @ts-ignore
          return new Date(n1.date) as any - new Date(n2.date) as any;
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
}
