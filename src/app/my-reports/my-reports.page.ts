import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from '../models/Report';
import { LocationService } from '../services/location/location.service';
import { Location } from '../models/Location';


@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
})
export class MyReportsPage {

  report: Report;
  reportList: Report[] = [];
  username: string;
  activeReport: Report;
  ishidden = true;
  reportState: string = '';
  reportType: string = '';
  reportDescr: string = '';
  reportLocDesc: string = '';
  reporterName: string = '';
  reportDate: string = '';
  reportLocatie: any;

  locaties: Location[];
  locatieLijst: any[];

  constructor(private reportService: ReportService,
              private router: Router, private activatedRoute: ActivatedRoute,
              private locationService: LocationService) {
    this.username = localStorage.getItem('userName');
    this.report = this.activatedRoute.snapshot.params.melding;
    this.listsInit();
  }
 
  //Vul lijst met alle rapporteringen van de active user. 
  private listsInit() {
    this.reportService.getAllReports().subscribe(data => {
      this.reportList = data;

      this.reportList = this.reportList.filter((item) => {
        return (item.reporter == this.username &&
          item.status.toString() !== 'GEANNULEERD');
      });

    });

    this.locationService.getAllLocalLocations().subscribe(data => {
      this.locaties = data;
      this.locatieLijst = this.locaties;
    });
  }

   //De gebruiker wordt genavigeerd naar de detail pagina van de melding. 
   detailReport(data) {
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(data)
      },
    });
  }

  //De rapportering wordt geannuleerd en in het archive geplaats. 
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
    this.reporterName = rep.reporter;
    this.reportState = rep.status;
    this.reportDescr = rep.description;
    this.reportLocDesc = rep.locationDescription;
    this.reportLocatie = rep.location;
    this.ishidden = false;
  }

  //De gewijzigde rapportering wordt naar de DB gestuurd. 
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
