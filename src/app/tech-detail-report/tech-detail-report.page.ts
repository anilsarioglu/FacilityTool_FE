import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { ReportService } from '../services/report/report.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tech-detail-report',
  templateUrl: './tech-detail-report.page.html',
  styleUrls: ['./tech-detail-report.page.scss'],
})
export class TechDetailReportPage implements OnInit {

  reportData: any

  constructor(private toastController: ToastController, private modalController: ModalController, private rs: ReportService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.reportData = JSON.parse(res.value);
      this.rs.getReportById(this.reportData.id).subscribe((data) => {
        console.log(data);
      });
    });

  }

  ngOnInit() {
    console.log("weed");

  }

}
