import { Component, ViewChild } from '@angular/core';
import { ArchiveService } from '../services/archive/archive.service';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage {
  rows = [];
  temp = [];

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  colMode = ColumnMode;

  constructor(private categoryService: ArchiveService, private router: Router) {
    this.categoryService.getAllDefects().subscribe(defects => {
       // cache our list
       this.temp = [...defects];
       // push our inital complete list
       this.rows = defects;
    })
   }

  search(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return (d.description.toLowerCase().indexOf(val) !== -1 || !val) || 
      (d.location.toLowerCase().indexOf(val) !== -1 || !val) ||
      (d.date.toLowerCase().indexOf(val) !== -1 || !val) ||
      (d.reporter.toLowerCase().indexOf(val) !== -1 || !val) || 
      (d.status.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  async showDetails(row) {
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(row)
      },
    });
  }

  fileName = 'Archive.xlsx';    
  exportExcel(): void {
    /* table id is passed over here */   
    const element: HTMLElement = document.getElementById('excel-table'); 
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);  
  }
}
