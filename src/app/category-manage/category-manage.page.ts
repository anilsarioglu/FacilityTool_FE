import { Component, OnInit } from '@angular/core';
import { Category } from '../services/category/category';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category/category.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppComponent }  from '../app.component';

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
      this.selected();
      this.cs.getAllCategories().subscribe(data => {
        this.categories = data;
        this.categoryList = this.categories;
      });
    }

    searchItems(e){
      const val: string = e.target.value;

      this.categoryList;
      if (val.trim() !== '') {
        this.kopieLijstVanCategories = this.categoryList.filter((item) => {
          return (item.name.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }

    createItem(d): FormGroup {
      return this.fb.group(d);
    }

    formulier() {
      this.categoryForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.maxLength(100)]],
      });
    }

    get name() { return this.categoryForm.get('name'); }
    get description() { return this.categoryForm.get('description'); }


    uploadSubmit() {
      this.cs.postCategory(this.categoryForm.value).subscribe((data) => { console.log(data); });
      location.reload();
    }

    selectedLevel: string;

    selected() {
      console.log(this.selectedLevel);
    }

    deleteCategory(e) {
      console.log(e);
      
      this.cs.deleteCategory(this.selectedLevel).subscribe();
      location.reload();
    }
}
