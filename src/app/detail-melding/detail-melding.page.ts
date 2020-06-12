import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ReportService } from '../services/report/report.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Tab1Page } from '../tab1/tab1.page';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-detail-melding',
  templateUrl: './detail-melding.page.html',
  styleUrls: ['./detail-melding.page.scss'],
})
export class DetailMeldingPage implements OnInit {
  // private serverUrl = 'http://localhost:8080/socket';
  // private serverUrl = 'https://vps100.ap.be/api/socket';

  private stompClient;

  uploadForm: FormGroup;
  meldingData: any;
  myDate: string = new Date().toISOString();

  message: string = '';
  date = new Date();

  storageDatum: Date;
  storageMessage: string = '';
  storageName: string = '';

  items = [];
  values;
  meldingDB;
  userdata: any;
  naam: string;
  email: string;

  ishidden: boolean = false;
  newState: any;

  searchValue: string = null;
  avater = "https://toppng.com/uploads/preview/beautiful-icon-vector-shield-marvel-free-icons-and-avengers-a-symbol-11553501608y8qjotnyh0.png"

  sliderOpts = {
    zoom: false,
    slidesPerView: 6,
    centeredSlides: true,
    spaceBetween: 10
  };

  constructor(private userservice: UserService, private toastController: ToastController, private storage: Storage, private file: File, private modalController: ModalController, private ng2ImgMax: Ng2ImgMaxService, private rs: ReportService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private datePipe: DatePipe) {
    this.avater = "https://toppng.com/uploads/preview/beautiful-icon-vector-shield-marvel-free-icons-and-avengers-a-symbol-11553501608y8qjotnyh0.png"

    this.activatedRoute.queryParams.subscribe((res) => {
      this.meldingData = JSON.parse(res.value);
      // console.log(this.meldingData);
      this.rs.getReportById(this.meldingData.id).subscribe((data) => {
        this.meldingDB = data;
        console.log(this.meldingDB);
      });

      this.userservice.getUserDetails().subscribe(data => {
        console.log(data);

        this.userdata = data;
        // console.log(this.userdata);

        console.log(this.naam);

        this.naam = data["name"];
        this.email = data["email"];
        localStorage.setItem("userName", data["name"])
      });
      this.newState = ' ';
    });

  }

  doRefresh(event) {
    this.rs.getReportById(this.meldingData.id);
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }


  sendMessage(message) {
    this.searchValue = '';
    console.log(this.uploadForm.value);
    this.rs.postReaction(this.meldingData.id, this.uploadForm.value).subscribe();
  }

  ngOnInit() {
    this.formulier();
  }

  formulier() {
    const naam = localStorage.getItem('userName');
    this.uploadForm = this.fb.group({
      messageId: this.meldingData.id,
      name: naam,
      message: this.message,
      date: this.date
    });
  }

  get messages() { return this.uploadForm.get('message'); }

  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

  Hide() {
    this.ishidden = !this.ishidden;
  }

  changeState() {
    this.rs.putStatusReport(this.meldingData.id, this.newState).subscribe((report) => {
      this.meldingData.status = this.newState;
    });
    this.ishidden = !this.ishidden;
  }
}
