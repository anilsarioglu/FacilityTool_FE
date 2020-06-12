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

  ishidden: boolean = false;
  newState: any;

  sliderOpts = {
    zoom: false,
    slidesPerView: 6,
    centeredSlides: true,
    spaceBetween: 10
  };

  constructor(private toastController: ToastController, private storage: Storage, private file: File, private modalController: ModalController, private ng2ImgMax: Ng2ImgMaxService, private rs: ReportService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private datePipe: DatePipe) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.meldingData = JSON.parse(res.value);
      this.rs.getReportById(this.meldingData.id).subscribe((data) => {
        this.meldingDB = data;
        // console.log(data);
      });
      this.newState = ' ';
    });

    // this.storage.get('reaction').then((val) => {
    //   this.values = val;
    // });
    // this.initializeWebSocketConnection();
  }

  // initializeWebSocketConnection() {
  //   const ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   const that = this;
  //   this.stompClient.connect({}, () => {
  //     that.stompClient.subscribe('/chat', (message) => {
  //       if (message.body) {
  //         $('.chat').append('<div class=\'message\'>' + message.body + '</div>');
  //       }
  //     });
  //   });
  // }

  // sendMessage(message) {
  //   this.stompClient.send('/app/send/message', {}, message);
  //   $('#input').val('');
  //   this.message = message;
  //   // console.log(this.uploadForm.value);

  //   this.items.push(this.uploadForm.value);
  //   this.storage.set('reaction', this.items);
  //   this.ms.postReaction(this.meldingData.id, this.uploadForm.value).subscribe();
  // }

  ngOnInit() {
    this.formulier();
  }

  formulier() {
    this.uploadForm = this.fb.group({
      messageId: this.meldingData.id,
      name: this.meldingData.melder,
      message: this.message,
      datum: this.date
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
