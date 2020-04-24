import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  melding: any;

  meldingLijst: any = [{
    id: 1,
    userrole: 'technical staff',
    soortMelding: 'defect',
    melder: 'Jori Jensen',
    datum: '15/10/2020',
    type: 'Sanitair',
    locatie: 'NOO 3.5'
  },
    {
      id: 2,
      userrole: 'teacher',
      soortMelding: 'taak',
      melder: 'John Possemier',
      datum: '24/04/2020',
      type: 'Verlichting',
      locatie: 'ELL 1.0.8/03'
    }];
  kopiemeldingLijst: any = this.meldingLijst;

  constructor(private navCtrl: NavController, private router: Router) {
    this.router;
  }

  ngOnInit() {

  }

  detailMelding(data) {
    console.log('geklikt');
    // this.router.navigate(['/detail-melding'], data);
    this.router.navigate(['/tabs/tab2'], {
      queryParams: {
        value: JSON.stringify(data)
      },

    });
  }

  initializeItems(): void {
    this.meldingLijst = this.kopiemeldingLijst;
  }

  async getLijst(){
    return this.meldingLijst.filter((melding) =>{
      return
    });
  }

  async searchItems(e) {
    console.log(this.meldingLijst);
    this.initializeItems();
    const val: string = e.target.value;

    if (!val) { return; }

    if (val.trim() !== '') {
      this.meldingLijst = this.kopiemeldingLijst.filter((item) => {
        return (item.type.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.melder.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.datum.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.locatie.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.soortMelding.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  async addMelding() {
    console.log('addMelding');
    // this.router.navigate("/meldingaanmakentab")
    this.router.navigate(['/tabs/tab2']);
  }
}
