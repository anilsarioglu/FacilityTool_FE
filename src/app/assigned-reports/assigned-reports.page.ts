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
  activeUserId: string;
  sortVal: string = "datum";
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.listReports();
  }

  ngOnInit() {
  }

  //Vul de lijst met de toegewezen rapporteringen van de gebruiker die aangemeld is.  
  listReports() {
    this.userService.getUserDetails().subscribe(details => {
      this.userService.getAssignedReports(details.id).subscribe(data => {
        console.log("UserID -> " + details.id);
        console.log("Data -> " + data);
        this.reportlist = data; 
        this.sortAll(); 
      });
    });

  }

  //De gebruiker wordt genavigeerd naar de detail pagina van de melding. 
  detailReport(data) {
    console.log('geklikt');
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(data)
      },
    });
  }
  //Kleuren van de statussen worden toegewezen. 
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
  
  //Sorteer de lijst op datum, locatie of status.
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
