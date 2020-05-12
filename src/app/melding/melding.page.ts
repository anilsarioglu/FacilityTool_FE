import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { NavController, NavParams, ModalController, PopoverController } from '@ionic/angular';
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
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Prediction } from '../services/prediction/prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-melding',
  templateUrl: './melding.page.html',
  styleUrls: ['./melding.page.scss'],
})

export class MeldingPage implements OnInit {

  @ViewChild('img', { static: false }) imageEl: ElementRef;

  predictions: Prediction[];

  model: any;

  uploadForm: FormGroup;
  meldingen: Melding[];
  datum = new Date();
  melder = 'Amine Abdelfettah';
  pNummer = 'P103906';
  meldingData = ['Defect', 'Opdracht'];
  // status = 'In behandeling';
  status = 'IN_BEHANDELING';

  locatie: any;
  category: string;
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
  constructor(private popoverController: PopoverController, private barcode: BarcodeScanner, private ng2ImgMax: Ng2ImgMaxService, private _decimalPipe: DecimalPipe,
    private imageCompress: NgxImageCompressService, private modalController: ModalController,
    private http: HttpClient, private navCtrl: NavController,
    private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private datePipe: DatePipe, private ms: MeldingService, private camera: Camera, private file: File) {
    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/*');
    this.locatie = this.activatedRoute.snapshot.params['locatie'];
    this.category = this.activatedRoute.snapshot.params['category'];
  }

  popup() {
    for (let i = 0; i < this.predictions.length; i++) {
      alert(this.predictions[i].className + '-' + this.predictions[i].probability);
    }
  }


  async ngOnInit() {
    this.formulier();
    this.model = await mobilenet.load();
    this.setValue();
  }

  inputCat: string = '';
  inputLoc: string = '';

  setValue() {
    this.activatedRoute.queryParams.subscribe(params => {
      const category_param = params['category'];
      console.log(category_param);
      this.inputCat = category_param;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      const location_param = params['location'];
      console.log(location_param);
      this.inputLoc = location_param;
    });
  }


  uploadSubmit() {

    this.reacties.push(this.createItem({
      // id: this.be,
      name: this.melder,
      message: this.berichten,
      datum: this.datum
      // datum: this.datePipe.transform(this.datum, 'dd-MM-yyTHH:mm:ss')
    }));

    // console.log(this.uploadForm.value);
    this.ms.postAlleMeldingen(this.uploadForm.value).subscribe((data) => { console.log(data); });
    //this.router.navigate(['/tab1']);
    this.router.navigate(['/tab1']);
  }



  async kiesLocatie() {
    this.navCtrl.navigateForward("/locatie");
    this.navCtrl.navigateForward("/locatie" + "?location=" + this.inputLoc + "?category=" + this.inputCat)
  }

  async kiesCategory() {
    this.navCtrl.navigateForward("/category-select" + "?location=" + this.inputLoc + "?category=" + this.inputCat);
  }

  createItem(data): FormGroup {
    return this.fb.group(data);
  }


  formulier() {
    this.uploadForm = this.fb.group({
      melder: [this.melder],
      pNummer: [this.pNummer],
      // datum: [this.datePipe.transform(this.datum, 'dd-MM-yy')],
      datum: [this.datum],
      type: ['', [Validators.required]],
      locatie: [this.locatie],
      category: [this.category],
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
  get categories() { return this.uploadForm.get("category") }
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


  compressFile(image) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);

      });
  }

  detectImages(event) {
    var orientation = -1;
    let files = event.target.files;

    for (let file of files) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        setTimeout(async () => {
          const imgEl = this.imageEl.nativeElement;
          this.predictions = await this.model.classify(imgEl);
        }, 0);
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


  public errorMessages = {
    type: [
      { type: 'required', message: 'Kies defect of opdracht' }
    ],
    locatie: [
      { type: 'required', message: 'kies een locatie' }
    ],
    beschrijving: [
      { type: 'required', message: 'Een beschrijving is noodzakelijk' },
      { type: 'mexlength', message: 'Rustig, je moet ook geen verhaal schrijven' }
    ],
    locatiebeschr: [
      { type: 'mexlength', message: 'Lengte mag niet langer dan 100 karakters bevatten' }
    ]
  };


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
      this.localUrl = data;
      this.photos.push(this.createItem({
        url: this.localUrl
      }));
    });
  }


  takePhotos() {
    this.barcode.scan().then(data => {
      this.photos.push(this.createItem({
        text: data.text
      }));
    })

    let options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI
    }
    this.camera.getPicture().then((imagedata) => {
      let filename = imagedata.substring(imagedata.lastIndexOf('/') + 1);
      let path = imagedata.substring(0, imagedata.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, filename).then(base64data => {
        this.photos.push(this.createItem({
          url: base64data
        }));
      })
    })
  }


}
