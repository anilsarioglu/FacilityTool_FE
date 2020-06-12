import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { Report } from '../models/Report';
import { UserService } from '../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assigned-reports',
  templateUrl: './assigned-reports.page.html',
  styleUrls: ['./assigned-reports.page.scss'],
})
export class AssignedReportsPage implements OnInit {

  employee: Employee; 
  report: Report;
  reportlist: Report[]=[]; 
  copyReportlist: Report[]=[]; 
  activeReportlist: Report[]=[]; 
  activeUserId: string;
  sortVal: string = "datum";
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.listReports();
  }

  ngOnInit() {
  }

  listReports() {
    this.userService.getUserDetails().subscribe(details => {
      this.userService.getAssignedReports(details.id).subscribe(data => {
        console.log("UserID -> " + details.id);
        console.log("Data -> " + data);
        //this.reportlist = data; 
        //tijdelijke oplossing om enkel defecten te tonen
        for (let def of data){
          if(def.type == " Defect "){
            this.reportlist.push(def)
          }
        }
        this.sortAll(); 
        this.copyReportlist = this.reportlist;
      });
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
  
  //search in list
  async searchItems(e) {
    const val: string = e.target.value;

    this.copyReportlist = this.reportlist; 
    
    if (val.trim() !== '') {
      this.reportlist = this.copyReportlist.filter((item) => {
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
    this.reportlist = this.reportlist.sort((n1, n2) => {
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
