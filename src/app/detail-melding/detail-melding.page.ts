import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MeldingService } from '../services/melding/melding.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-melding',
  templateUrl: './detail-melding.page.html',
  styleUrls: ['./detail-melding.page.scss'],
})
export class DetailMeldingPage implements OnInit {


  uploadForm: FormGroup;
  meldingData: any
  myDate: String = new Date().toISOString();

  sliderOpts = {
    zoom: false,
    slidesPerView: 6,
    centeredSlides: true,
    spaceBetween: 10
  }

  constructor(private camera: Camera, private file: File, private modalController: ModalController, private ng2ImgMax: Ng2ImgMaxService, private ms: MeldingService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private datePipe: DatePipe) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.meldingData = JSON.parse(res.value);
    });
    // this.id = 1;

  }

  ngOnInit() {
    // this.id++;
    this.formulier();
  }


  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }



  uploadSubmit() {
    this.reacties.push(this.createItem({
      melder: this.meldingData.melder,
      bericht: this.berichten,
      datum: this.datePipe.transform(this.myDate, 'dd-MM-yyTHH:mm:ss')
    }));

    console.log(this.uploadForm.value);
    this.ms.postAlleMeldingen(this.uploadForm.value).subscribe((data) => { console.log(data); });

  }



  formulier() {
    this.uploadForm = this.fb.group({
      id: [this.meldingData.id],
      melder: [this.meldingData.melder],
      datum: [this.meldingData.datum],
      pNummer: [this.meldingData.pNummer],
      type: [this.meldingData.type],
      locatie: [this.meldingData.locatie],
      beschrijving: [this.meldingData.beschrijving],
      locatiebeschr: [this.meldingData.locatiebeschr],
      status: [this.meldingData.status],
      reactie: this.fb.array([]),
      bericht: []
    });
  }

  createItem(data): FormGroup {
    return this.fb.group(data);
  }


  get reacties(): FormArray { return this.uploadForm.get('reactie') as FormArray; }
  get berichten() { return this.uploadForm.get("bericht") };


}
