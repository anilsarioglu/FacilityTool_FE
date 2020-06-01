import { Component, OnInit } from '@angular/core';
import { MailTemplate } from '../models/MailTemplate';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MailTemplateService } from '../services/mailTemplate/mail-template.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-mail-template-manage',
  templateUrl: './mail-template-manage.page.html',
  styleUrls: ['./mail-template-manage.page.scss'],
})
export class MailTemplateManagePage implements OnInit {

  mailTemplates: MailTemplate[];
  mailTemplateList: any[];
  copyOfMailTemplateList: any[];

  mailTemplateForm: FormGroup;

  constructor(private navCtrl: NavController, private router: Router,
    private http: HttpClient, private ms: MailTemplateService, private alertCtrl: AlertController, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formulier();
    this.ms.getAllMailTemplates().subscribe(data => {
      this.mailTemplates = data;
      this.mailTemplateList = this.mailTemplates;
      this.copyOfMailTemplateList = this.mailTemplateList; 
    });
  }

  formulier() {
    this.mailTemplateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  get name() { return this.mailTemplateForm.get('name'); }
  get message() { return this.mailTemplateForm.get('description'); }

  uploadSubmit() {
    this.ms.postMailTemplate(this.mailTemplateForm.value).subscribe((data) => {
      console.log(data);
      this.copyOfMailTemplateList.splice(this.copyOfMailTemplateList.length, 0, data);
    });
    this.mailTemplateForm.reset();
  }

  content;

  displayContent($event){
    let mt = this.copyOfMailTemplateList.find(m => m.name === $event.detail.value);
    this.content = mt.message;
  }

  selectedTemplate;

  async deleteMailTemplate(){
    if (this.selectedTemplate == undefined) {
      const alert = await this.alertCtrl.create({
        header: 'Fout!',
        message: 'Geen sjabloon geselecteerd om te verwijderen!',
        buttons: ['OK']
      });
  
      await alert.present();
    } else if (this.selectedTemplate != undefined) {
      const alert = await this.alertCtrl.create({
        header: 'Verwijderen!',
        message: 'Bent u zeker dat u dit sjabloon wilt verwijderen?',
        buttons: [
          {
            text: 'Ja',
            handler: () => {
              alert.dismiss().then(() => { this.ms.deleteMailTemplate(this.selectedTemplate).subscribe(); location.reload(); });
              return false;
            }
          },
          { text: 'Nee' }
        ]
      });
  
      await alert.present();
      
    }
  }
}
