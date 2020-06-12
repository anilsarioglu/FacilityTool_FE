import { Component, ViewChild } from '@angular/core';
import { ArchiveService } from '../services/archive/archive.service';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Platform } from '@ionic/angular';
import { Report } from '../models/Report';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage {
  isMobile: boolean = false;
  imgSrcs: string[] = [];
  sortVal: string = "datum";
  rows: Report[] = [];
  temp: Report[] = [];
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  colMode = ColumnMode;
  fileName = 'Archive.xlsx';

  constructor(private archiveService: ArchiveService, private router: Router, private platform: Platform) {
    this.checkIfMobile();
    this.archiveService.getAllDefects().subscribe(defects => {
       // cache our list
       this.temp = [...defects];
       // push our inital complete list
       this.rows = defects;
       this.fillDefectPhotoURL();
    });
   }

   checkIfMobile() {
     // DOESN'T WORK ON GOOGLE CHROME EMULATOR

     // if (this.platform.is("desktop")) {
     //   this.isMobile = false;
     // } else {
     //   this.isMobile = true;
     // }

     // FOR DEMO PURPOSES ONLY
     this.isMobile = this.platform.is('ios');
   }

   fillDefectPhotoURL() {
     for (let i = 0; i < this.rows.length; i++) {
       if (this.rows[i].photos.length > 0) {
         this.imgSrcs[i] = this.rows[i].photos[0].url;
       } else {
         this.imgSrcs[i] = '../../assets/imgs/Defect.png';
       }
     }
   }

  search(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return (d.description.toLowerCase().indexOf(val) !== -1 || !val) || 
      (d.location.toString().toLowerCase().indexOf(val) !== -1 || !val) ||
      (d.date.toString().toLowerCase().indexOf(val) !== -1 || !val) ||
      (d.reporter.toLowerCase().indexOf(val) !== -1 || !val) || 
      (d.status.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.rows = temp;
    if (this.isMobile == false) {
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }

  async showDetails(row: Report) {
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(row)
      },
    });
  }

  sortAll() {
    this.rows = this.rows.sort((n1, n2) => {
      if (this.sortVal === 'datum') {
        // @ts-ignore
          return new Date(n1.date) as any - new Date(n2.date) as any;
      } else if (this.sortVal === 'melder') {
        if (n1.reporter > n2.reporter) {
          return 1;
        }
        if (n1.reporter < n2.reporter) {
          return -1;
        }
        return 0;
      }
    });
  }
  exportExcel(): void {
    const element: HTMLElement = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // toevoegen aan worksheets
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // bestand opslaan
    XLSX.writeFile(wb, this.fileName);
  }
}
