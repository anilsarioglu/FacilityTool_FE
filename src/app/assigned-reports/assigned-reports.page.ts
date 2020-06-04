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
  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.listReports(); 
  }

  ngOnInit() {
  }

  listReports() {
    this.employeeService.getAllReports("5ed60e91c1913518bf7f2c8f").subscribe(data => {
      console.log(data);
      this.reportlist = data;

    });
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

  //search in list
  // async searchItems(e) {
  //   const val: string = e.target.value;

  //   this.activeList();
  //   if (val.trim() !== '') {
  //     this.kopieLijstVanMeldingen = this.actieveLijstVanMeldingen.filter((item) => {
  //       return (item.type.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //           (item.reporter.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //           (item.date.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //           (item.location.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //           (item.pNumber.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //           (item.status.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //           // (item.categorie.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //           (item.description.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //           (item.locationDescription.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     });
  //   }
  // }

}
