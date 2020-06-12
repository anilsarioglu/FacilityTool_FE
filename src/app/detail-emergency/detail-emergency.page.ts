import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emergency } from '../models/Emergency';
import { EmergencyService } from '../services/emergency/emergency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-emergency',
  templateUrl: './detail-emergency.page.html',
  styleUrls: ['./detail-emergency.page.scss'],
})
export class DetailEmergencyPage implements OnInit {

  emergencyData: Emergency[] = [];
  uploadForm: FormGroup;

  constructor(private es: EmergencyService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.emergencyData = JSON.parse(res.value);
      // console.log(this.emergencyData);
    });
  }

  ngOnInit() {
    this.formulier();
  }




  uploadSubmit() {
    // console.log(this.uploadForm.value);

    this.es.putEmergency(this.uploadForm.get('id').value, this.uploadForm.value).subscribe((emergency) => {
      console.log(emergency);
    });

    this.router.navigate(['/emergency']);
  }


  formulier() {
    let numberPattern = "(^[i][n][t][.] [0-9]{5}$)|^([0][23] [0-9]{3} [0-9]{2} [0-9]{2}$)|(^[+][32]{2} [3]{1} [0-9]{3} [0-9]{2} [0-9]{2}$)|(^[0-9]{4} [0-9]{2} [0-9]{2} [0-9]{2}$)|(^[+][32]{2} [0-9]{3} [0-9]{2} [0-9]{2} [0-9]{2}$)";
    let mailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
    this.uploadForm = this.fb.group({
      id: [this.emergencyData["id"]],
      emergencyContactsType: [this.emergencyData["emergencyContactsType"]],
      employeeType: [this.emergencyData["employeeType"]],
      employeeName: [this.emergencyData["employeeName"]],
      phoneNumber: [this.emergencyData["phoneNumber"], [Validators.required, Validators.pattern(numberPattern)]],
      mobileNumber: [this.emergencyData["mobileNumber"], [Validators.required, Validators.pattern(numberPattern)]],
      mail: [this.emergencyData["mail"], [Validators.required, Validators.pattern(mailPattern)]],
      mail2: [this.emergencyData["mail2"], [Validators.required, Validators.pattern(mailPattern)]],
    });
  }


  get ids() { return this.uploadForm.get("id") };
  get emergencyContactsTypes() { return this.uploadForm.get("emergencyContactsType") };
  get employeeTypes() { return this.uploadForm.get("employeeType") };
  get employeeNames() { return this.uploadForm.get("employeeName") };
  get phoneNumbers() { return this.uploadForm.get("phoneNumber") };
  get mobileNumbers() { return this.uploadForm.get("mobileNumber") };
  get mails() { return this.uploadForm.get("mail") };
  get mail2s() { return this.uploadForm.get("mail2") }



  public errorMessages = {
    emergencyContactsType: [
      { type: 'required', message: 'Geef een noodnummer type zoals onderhoudsmedewerker of Medewerker helpdesk.' },
      { type: 'mexlength', message: 'Rustig, je moet ook geen verhaal schrijven' }
    ],
    employeeType: [
      { type: 'required', message: 'Kies een soort werknemer.' },
      { type: 'mexlength', message: 'Rustig, je moet ook geen verhaal schrijven' }
    ],
    employeeName: [
      { type: 'required', message: 'Hier komt er een naam.' },
      { type: 'mexlength', message: 'Rustig, je moet ook geen verhaal schrijven' }
    ],
    phoneNumber: [
      { type: 'mexlength', message: 'Lengte mag niet langer dan 60 karakters bevatten' }
    ], mobileNumber: [
      { type: 'mexlength', message: 'Lengte mag niet langer dan 60 karakters bevatten' }
    ],
    mail: [
      { type: 'required', message: 'Een beschrijving is noodzakelijk' },
      { type: 'mexlength', message: 'Lengte mag niet langer dan 60 karakters bevatten' }
    ],
    mail2: [
      { type: 'mexlength', message: 'Lengte mag niet langer dan 60 karakters bevatten' }
    ]
  };

}
