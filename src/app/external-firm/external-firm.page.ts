import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ExFirmService } from '../services/exFirm/ex-firm.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-external-firm',
  templateUrl: './external-firm.page.html',
  styleUrls: ['./external-firm.page.scss'],
})
export class ExternalFirmPage implements OnInit {

  externalFirmList: any = [];
  uploadForm: FormGroup;



  constructor(private efs: ExFirmService, private alertCtrl: AlertController, private router: Router, private fb: FormBuilder) {
    this.listExternalFirms();
  }

  ionViewWillEnter(){
    this.listExternalFirms();
  }

  formToggle() {
    let acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
      });
    }

  }


  ngOnInit() {
    this.formToggle();
    this.formulier();
  }

  toggleSection(i) {
    this.externalFirmList[i].open = !this.externalFirmList[i].open;
  }

  uploadSubmit() {
    // console.log(this.uploadForm.value);

    this.efs.postExternalFirm(this.uploadForm.value).subscribe((data) => {
      console.log(data);
      this.externalFirmList.splice(this.externalFirmList.length, 0, data);
    });
    this.uploadForm.reset();
  }

  formulier() {
    let mailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
    let number = "^[+()int.0-9_ ]*$";
    let name = "^[a-zA-Z_ ]*$";
    this.uploadForm = this.fb.group({
      contactPerson: ['', [Validators.required, Validators.pattern(name)]],
      mail: ['', [Validators.required, Validators.pattern(mailPattern)]],
      phoneNumber: ['', [Validators.pattern(number)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(number)]],
      companyName: ['', [Validators.required, Validators.pattern(name)]]
    });
  }


  doRefresh(event) {
    this.listExternalFirms();
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }


  listExternalFirms() {
    this.efs.getAllExternalFirms().subscribe(data => {
      console.log(data);
      this.externalFirmList = data;
    });
  }

  async deleteExternalFirm(i, e, id) {
    console.log(e);
    const event = e.currentTarget.innerText;

    const alert = await this.alertCtrl.create({
      header: 'Weet u zeker dat u deze externe Firma wil verwijderen?',
      message: '' + event.toLowerCase(),
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            alert.dismiss().then(() => {
              this.efs.deleteExternalFirmById(id).subscribe();
              this.externalFirmList.splice(i, 1);
            });
            return false;
          }
        },
        { text: 'Nee' }
      ]
    });
    await alert.present();
  }


  changeExternalFirm(data) {
    console.log('geklikt');
    this.router.navigate(['/detail-ex-firm'], {
      queryParams: {
        value: JSON.stringify(data)
      },
    });
  }




}
