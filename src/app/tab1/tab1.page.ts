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
    melder: 'Jori Jensen',
    datum:'15/10/2020',
    type: 'Sanitair',
    locatie: 'NOO 3.5'
  },
  {
    id: 2,
    melder: 'John Possemier',
    datum: '24/04/2020',
    type: 'Verlichting',
    locatie: 'ELL 1.0.8/03'
  }];
  kopieLijstVanMeldingen: any = [];

  constructor(private navCtrl: NavController, private router: Router) {
    
    this.router;
  }

  ngOnInit(){
    this.melding = [
      {
        id: 1,
        melder: 'Jori Jensen',
        datum:'15/10/2020',
        type: 'Sanitair',
        locatie: 'NOO 3.5'
      },
      {
        id: 2,
        melder: 'John Possemier',
        datum: '24/04/2020',
        type: 'Verlichting',
        locatie: 'ELL 1.0.8/03'
      }
    ]
  }
  detailMelding(data) {
    console.log("geklikt");
    // this.router.navigate(['/detail-melding'], data);
    this.router.navigate(['/tabs/tab2'], {
      queryParams: {
        value: JSON.stringify(data)
      },

    });
  }

  initializeItems(): void {
    this.meldingLijst = this.kopieLijstVanMeldingen;
  }


  async searchItems(e) {
    console.log(this.meldingLijst);
    this.initializeItems();
    let val: string = e.target.value;

    if (!val) return;

    if (val.trim() !== '') {
      this.meldingLijst = this.kopieLijstVanMeldingen.filter((item) => {
        return (item.type.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.melder.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.datum.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.locatie.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.beschrijving.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.locatiebeschr.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async addMelding() {
    console.log("addMelding");
    //this.router.navigate("/meldingaanmakentab")
    this.router.navigate(['/tabs/tab2']);
  }

}
