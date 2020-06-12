import { Component, OnInit } from '@angular/core';
import { ExternalFirm } from '../models/ExternalFirm';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExFirmService } from '../services/exFirm/ex-firm.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-ex-firm',
  templateUrl: './detail-ex-firm.page.html',
  styleUrls: ['./detail-ex-firm.page.scss'],
})
export class DetailExFirmPage implements OnInit {

  externalFirmData: ExternalFirm[] = [];
  uploadForm: FormGroup;

  constructor(private efs: ExFirmService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.externalFirmData = JSON.parse(res.value);
      // console.log(this.emergencyData);
    });
  }


  ngOnInit() {
    this.formulier();
  }


  uploadSubmit() {
    // console.log(this.uploadForm.value);

    this.efs.putExternalFirm(this.uploadForm.get('id').value, this.uploadForm.value).subscribe((data) => {
      console.log(data);
    });

    this.router.navigate(['/external-firm']);
  }


  formulier() {
    let mailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
    let number = "^[+()int.0-9_ ]*$";
    let name = "^[a-zA-Z_ ]*$";
    this.uploadForm = this.fb.group({
      id: [this.externalFirmData["id"]],
      contactPerson: [this.externalFirmData["contactPerson"], [Validators.required, Validators.pattern(name)]],
      mail: [this.externalFirmData["mail"], [Validators.required, Validators.pattern(mailPattern)]],
      phoneNumber: [this.externalFirmData["phoneNumber"], [ Validators.pattern(number)]],
      mobileNumber: [this.externalFirmData["mobileNumber"], [Validators.required, Validators.pattern(number)]],
      companyName: [this.externalFirmData["companyName"], [Validators.required, Validators.pattern(name)]]
    });
  }


  get ids() { return this.uploadForm.get("id") };
  get contactPersons() { return this.uploadForm.get("contactPerson") };
  get mails() { return this.uploadForm.get("mail") };
  get phoneNumbers() { return this.uploadForm.get("phoneNumber") };
  get mobileNumbers() { return this.uploadForm.get("mobileNumber") };
  get companyNames() { return this.uploadForm.get("companyName") };




  public errorMessages = {
    contactPerson: [
      { type: 'required', message: 'Wie is de contactpersoon.' },
      { type: 'mexlength', message: 'Rustig, je moet ook geen verhaal schrijven' }
    ],
    companyName: [
      { type: 'required', message: 'Geef een bedrijf.' },
      { type: 'mexlength', message: 'Rustig, je moet ook geen verhaal schrijven' }
    ],
    phoneNumber: [
      { type: 'mexlength', message: 'Lengte mag niet langer dan 60 karakters bevatten' }
    ],
    mobileNumber: [
      { type: 'mexlength', message: 'Lengte mag niet langer dan 60 karakters bevatten' }
    ],
    mail: [
      { type: 'required', message: 'Een mail is noodzakelijk' },
      { type: 'mexlength', message: 'Lengte mag niet langer dan 60 karakters bevatten' }
    ]
  };

}
