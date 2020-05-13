import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../models/Location';
import { MeldingService } from '../services/melding/report.service';

@Component({
  selector: 'app-locatie-melding',
  templateUrl: './locatie-melding.page.html',
  styleUrls: ['./locatie-melding.page.scss'],
})
export class LocatieMeldingPage implements OnInit {

  meldingLocatie: any;
  // meldingLocatieList[]: any;

  meldingLocatieList = [];

  constructor(private activatedRoute: ActivatedRoute, private ms: MeldingService, private router: Router) {
    this.meldingLocatie = this.activatedRoute.snapshot.params['locatie'];
  }

  ngOnInit() {
    // console.log(this.meldingLocatie);
    this.ms.getReportsByLocation(this.meldingLocatie).subscribe(data => {
      this.meldingLocatieList = data;
      console.log(this.meldingLocatieList);
    })
  }


  detailMelding(data) {
    console.log("geklikt");
    this.router.navigate(['/detail-melding'], {
      queryParams: {
        value: JSON.stringify(data)
      },
    });
  }

}
