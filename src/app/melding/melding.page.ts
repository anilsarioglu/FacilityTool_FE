import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { getLocaleMonthNames, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeldingService } from '../services/melding/melding.service';
import { Melding } from '../services/melding/melding';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { FileUploader } from 'ng2-file-upload';


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
  pNummer = 'P103906';
  meldingData = ["Defect", "Opdracht"];
  // status = 'In behandeling';
  status = 'IN_BEHANDELING';

  locatie: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  fileName: any;
  myFiles: string[] = [];



  sliderOpts = {
    zoom: false,
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 3
  }


  private contentHeaders: HttpHeaders;
  constructor(private ng2ImgMax: Ng2ImgMaxService, private _decimalPipe: DecimalPipe,
    private imageCompress: NgxImageCompressService, private modalController: ModalController,
    private http: HttpClient, private navCtrl: NavController,
    private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private datePipe: DatePipe, private ms: MeldingService, private camera: Camera, private file: File) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/*');
    this.locatie = this.activatedRoute.snapshot.params['locatie'];

  }



  ngOnInit() {
    this.formulier();
  }

  uploadSubmit() {

    this.reacties.push(this.createItem({
      melder: this.melder,
      bericht: this.berichten,
      datum: this.datePipe.transform(this.datum, 'dd-MM-yyTHH:mm:ss')
    }));

    // console.log(this.uploadForm.value);
    this.ms.postAlleMeldingen(this.uploadForm.value).subscribe((data) => { console.log(data); });
    this.router.navigate(['/tabs/tab1']);
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/*' });
    return blob;
  }

  async kiesLocatie() {
    this.navCtrl.navigateForward("/locatie");
  }

  createItem(data): FormGroup {
    return this.fb.group(data);
  }


  formulier() {
    this.uploadForm = this.fb.group({
      melder: [this.melder],
      pNummer: [this.pNummer],
      datum: [this.datePipe.transform(this.datum, 'dd-MM-yy')],
      type: ['', [Validators.required]],
      locatie: [this.locatie],
      beschrijving: ['', [Validators.required, Validators.maxLength(100)]],
      locatiebeschr: ['', [Validators.required, Validators.maxLength(100)]],
      status: [this.status],
      reactie: this.fb.array([]),
      bericht: [],
      photos: this.fb.array([])
    });
  }

  get melders() { return this.uploadForm.get("melder") };
  get pNummers() { return this.uploadForm.get("pNummer") };
  get datums() { return this.uploadForm.get("datum") };
  get type() { return this.uploadForm.get("type") };
  get locaties() { return this.uploadForm.get("locatie") };
  get beschrijving() { return this.uploadForm.get("beschrijving") };
  get locatiebeschr() { return this.uploadForm.get("locatiebeschr") };
  get statuss() { return this.uploadForm.get("status") };
  get reacties(): FormArray { return this.uploadForm.get('reactie') as FormArray; }
  get berichten() { return this.uploadForm.get("bericht") };
  get photos(): FormArray { return this.uploadForm.get('photos') as FormArray; };

  removePhoto(i) {
    this.photos.removeAt(i);
  }

  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }


  compressFile(image) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    // console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        // console.log(this.imgResultAfterCompress);
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        // console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
        // create file from byte
        // const imageName = fileName;
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
        //imageFile created below is the new compressed file which can be send to API in form data
        // const imageFile = new File([result], imageName, { type: 'image/*' });

      });
  }



  detectImages(event) {
    var orientation = -1;
    let files = event.target.files;

    for (let file of files) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        // 35, 25
        //10,5
        this.imageCompress.compressFile(this.localUrl, orientation, 10, 5).then(
          result => {
            this.photos.push(this.createItem({
              name: file.name,
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
              size: file.size,
              type: file.type,
              url: result
            }));
          });
      }
      reader.readAsDataURL(file);
    }
  }


  getImage(sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      allowEdit: false
    }

    this.camera.getPicture(options).then(imagedata => {
      let data = 'data:image/*;base64,' + imagedata;
      // this.afbeelding.push(data);
      this.localUrl = data;
      // console.log(data);
      this.photos.push(this.createItem({
        url: this.localUrl
      }));
    });
  }

}
