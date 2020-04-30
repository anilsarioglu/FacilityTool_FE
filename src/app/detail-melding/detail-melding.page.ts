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

  }

  ngOnInit() {
    this.formulier();
  }

  uploadSubmit() {
    console.log(this.uploadForm.value);
    this.ms.postAlleReacties(this.uploadForm.value).subscribe();
  }

  formulier() {
    this.uploadForm = this.fb.group({
      id: this.meldingData.id,
      name: this.meldingData.melder,
      message: []
    });
  }



  get messages() { return this.uploadForm.get("message") };


  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }


}
