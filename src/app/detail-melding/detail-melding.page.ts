import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-melding',
  templateUrl: './detail-melding.page.html',
  styleUrls: ['./detail-melding.page.scss'],
})
export class DetailMeldingPage implements OnInit {

  meldingData: any

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.meldingData = JSON.parse(res.value)
      console.log(this.meldingData);
    });
  }

  ngOnInit() {
  }

}
