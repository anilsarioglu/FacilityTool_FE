import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category/category.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.page.html',
  styleUrls: ['./category-manage.page.scss'],
})
export class CategoryManagePage implements OnInit {
  categories: Category[];
  categoryList: any[];
  kopieLijstVanCategories: any[];
  categoryForm: FormGroup;

  constructor(private navCtrl: NavController, private router: Router,
    private http: HttpClient, private cs: CategoryService, private alertCtrl: AlertController, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formulier();
    this.cs.getAllLocalCategories().subscribe(data => {
      this.categories = data;
      this.categoryList = this.categories;
      this.kopieLijstVanCategories = this.categoryList;
    });
  }

  searchItems(e) {
    const val: string = e.target.value;

    this.kopieLijstVanCategories = this.categoryList;
    if (val.trim() !== '') {
      this.kopieLijstVanCategories = this.categoryList.filter((item) => {
        return (item.name.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.description.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  createItem(d): FormGroup {
    return this.fb.group(d);
  }

  formulier() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(100)]],
    });
  }

  get name() { return this.categoryForm.get('name'); }
  get description() { return this.categoryForm.get('description'); }

  async uploadSubmit() {
    let found = false;
    for (let cat of this.categoryList) {
      if (cat.name === this.categoryForm.get('name').value) {
        found = true;
      }
    }
    if (found) {
      const alert = await this.alertCtrl.create({
        header: 'Categorie bestaat al!',
        message: 'Er is al een categorie met deze naam aangemaakt in de lijst.',
        buttons: ['Oke']
      });
      await alert.present();
    } else {
      this.cs.postCategory(this.categoryForm.value).subscribe((data) => {
        this.kopieLijstVanCategories.splice(this.kopieLijstVanCategories.length, 0, data);
      });
      this.categoryForm.reset();
    }
  }

  async deleteCategory(i: number, cat: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Verwijderen!',
      message: 'Bent u zeker dat u deze categorie wilt verwijderen?',
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            alert.dismiss().then(() => {
              this.cs.deleteCategory(cat.name).subscribe();
              this.categoryList = this.categories;
              this.categories.splice(this.categories.indexOf(cat), 1);
              this.kopieLijstVanCategories = this.categoryList;
            });
            return false;
          }
        },
        { text: 'Nee' }
      ]
    });

    await alert.present();
  }
}

