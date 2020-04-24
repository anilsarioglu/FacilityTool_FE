import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { getLocaleMonthNames, DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeldingService } from '../services/melding/melding.service';
import { Melding } from '../services/melding/melding';


@Component({
  selector: 'app-melding',
  templateUrl: './melding.page.html',
  styleUrls: ['./melding.page.scss'],
})
export class MeldingPage implements OnInit {


  uploadForm: FormGroup;
  meldingen: Melding[];
  datum = new Date();
  melder = 'Amine Abdelfettah'
  PNummer = 'P103906';
  meldingData = ["Defect", "Opdracht"];
  locatie: any;
  meldingFromService: any = "";
  meldingWaardeLijst: [];


  userFile: any = File;


  private contentHeaders: HttpHeaders;

  constructor(private modalController: ModalController, private http: HttpClient, private navCtrl: NavController,
    private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private datePipe: DatePipe, private ms: MeldingService) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/*');
    this.locatie = this.activatedRoute.snapshot.params['locatie'];
  }

  ngOnInit() {
    this.formulier();
  }

  uploadSubmit() {

    // console.log(this.uploadForm.value);
    this.ms.postAlleMeldingen(this.uploadForm.value).subscribe((data) => { console.log(data); });
    this.router.navigate(['/tab1']);
  }

  async kiesLocatie() {
    this.navCtrl.navigateForward("/locatie")
  }

  createItem(data): FormGroup {
    return this.fb.group(data);
  }

  formulier() {
    this.uploadForm = this.fb.group({
      melder: [this.melder],
      PNummer: [this.PNummer],
      datum: [this.datePipe.transform(this.datum, 'dd-MM-yy')],
      type: ['', [Validators.required]],
      locatie: [this.locatie],
      beschrijving: ['', [Validators.required, Validators.maxLength(100)]],
      locatiebeschr: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  get melders() { return this.uploadForm.get("melder") }
  get Pnummers() { return this.uploadForm.get("PNummer") }
  get datums() { return this.uploadForm.get("datum") }
  get type() { return this.uploadForm.get("type") }
  get locaties() { return this.uploadForm.get("locatie") }
  get beschrijving() { return this.uploadForm.get("beschrijving") }
  get locatiebeschr() { return this.uploadForm.get("locatiebeschr") }

}
