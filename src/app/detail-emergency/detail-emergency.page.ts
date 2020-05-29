import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emergency } from '../models/Emergency';
import { EmergencyService } from '../services/emergency/emergency.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    // console.log(this.uploadForm.get('id').value);

    this.es.putEmergency(this.uploadForm.get('id').value, this.uploadForm.value).subscribe((emergency) => {
      console.log(emergency);
    });

    this.router.navigate(['/emergency']);
  }


  formulier() {
    this.uploadForm = this.fb.group({
      id: [this.emergencyData["id"]],
      emergencyContactsType: [],
      employeeType: [],
      employeeName: [],
      phoneNumber: [],
      mobileNumber: [],
      mail: [],
      mail2: [],
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
}
