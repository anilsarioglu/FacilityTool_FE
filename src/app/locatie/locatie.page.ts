import { Component, OnInit } from '@angular/core';
import { Locatie } from '../services/locatie/locatie';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocatieService } from '../services/locatie/locatie.service';
import { MeldingService } from '../services/melding/melding.service';

@Component({
  selector: 'app-locatie',
  templateUrl: './locatie.page.html',
  styleUrls: ['./locatie.page.scss'],
})
export class LocatiePage implements OnInit {

  locaties: Locatie[];
  locatieLijst: any[];
  category: string;

  meldingbestaat: Boolean;
  tekst;


  constructor(private navCtrl: NavController, private router: Router,
    private http: HttpClient, private ls: LocatieService, private alertCtrl: AlertController, private ms: MeldingService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ls.geefAlleLocaties().subscribe(data => {
      this.locaties = data;
      this.locatieLijst = this.locaties;
      this.setValue();
    })
  }

  setValue() {
    this.activatedRoute.queryParams.subscribe(params => {
      const category_param = params['category'];
      this.category = category_param;   
    });
  }

  initializeItems(): void {
    this.locaties = this.locatieLijst;
  }


  async searchItems(e) {
    this.initializeItems();
    let val: string = e.target.value;

    if (!val) return;

    if (val.trim() !== '') {
      this.locaties = this.locatieLijst.filter((item) => {
        return (item.naam.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.lokaal.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  selectNoorder() {
    this.initializeItems();
    this.locaties = this.locatieLijst.filter((item) => {
      return (item.campus.indexOf("Spoor Noord - Noorderplaats") > -1);
    })
  }

  selectEllerman() {
    this.initializeItems();
    this.locaties = this.locatieLijst.filter((item) => {
      return (item.campus.indexOf("Spoor Noord - Ellermanstraat") > -1);
    })
  }

  async selectLocatie(e: any) {

    let event = e.currentTarget.innerText;
    console.log("deze shit:" + this.category);
    
    const alert = await this.alertCtrl.create({
      header: "Locatie",
      message: "" + event.toLowerCase(),
      buttons: [
        {
          text: 'Selecteer locatie',
          handler: () => {
            alert.dismiss().then(() => { this.router.navigate(['/melding'], { queryParams: { location: event, category: this.category } }); });
            return false;
          }
        },
        {
          text: 'reeds gemelde defecten',
          handler: () => {
            this.ms.getAlleLocatiesFromMeldingen(event).subscribe(async data => {
              if (data.length >= 1) {
                alert.dismiss().then(() => { this.router.navigate(['/locatie-melding' + '/' + event]); });
                return false;
              } else {
                const alert2 = await this.alertCtrl.create({
                  header: "Geen defecten.",
                  buttons: [{ text: 'Annuleer' }]
                });
                alert2.present();
              }
            })
          }
        },
        { text: 'Annuleer' }
      ]
    });
    await alert.present();

  }

  selectedVerdieping(e) {
    this.initializeItems();
    this.locaties = this.locatieLijst.filter((item) => {
      if (e == item.verdieping) return item.verdieping;
    })

  }

}




