import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.page.html',
  styleUrls: ['./category-select.page.scss'],
})
export class CategorySelectPage implements OnInit {

  categories: Category[];
  categoryList: any[];

  location: string;

  constructor(private navCtrl: NavController, private router: Router,
    private http: HttpClient, private cs: CategoryService, private alertCtrl: AlertController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cs.getAllLocalCategories().subscribe(data => {
      this.categories = data;
      this.categoryList = this.categories;
      this.setValue();
    })
  }

  setValue() {
    this.activatedRoute.queryParams.subscribe(params => {
      const location_param = params['location'];
      this.location = location_param;
    });
  }

  initializeItems(): void {
    this.categories = this.categoryList;
  }


  async searchItems(e) {
    this.initializeItems();
    let val: string = e.target.value;

    if (!val) return;

    if (val.trim() !== '') {
      this.categories = this.categoryList.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async selectCategory(e: any) {

    let event = e.currentTarget.innerText;

    const alert = await this.alertCtrl.create({
      header: "Categorie",
      message: "" + event.toLowerCase(),
      buttons: [

        { text: 'Annuleer' },
        {
          text: 'Selecteer categorie',
          handler: () => {
            alert.dismiss().then(() => { this.router.navigate(['/melding'], { queryParams: { location: this.location, category: event } }); });
            return false;
          }
        }
      ]
    });
    await alert.present();

  }


}
