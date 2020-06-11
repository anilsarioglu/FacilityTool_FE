import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { NavController, NavParams, ModalController, PopoverController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { getLocaleMonthNames, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReportService } from '../services/report/report.service';
import { Report } from '../models/Report';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { FileUploader } from 'ng2-file-upload';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Prediction } from '../services/prediction/prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { UserService } from '../services/user/user.service';

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
  meldingen: Report[];
  date = new Date();
  //reporter = 'Amine Abdelfettah';
  // reporter = '';
  //pNumber = 'P103906';
  meldingData = ['Defect', 'Opdracht'];
  // status = 'In behandeling';
  status = 'IN_BEHANDELING';

  // user info
  userdata: any;
  // usernaam: String; 
  email: String;

  showDateSelector: boolean = false;

  requestDate: Date;
  location: any;
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
    private fb: FormBuilder, private datePipe: DatePipe, private ms: ReportService, private camera: Camera, private file: File,
    private userService: UserService) {

    this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/*');
    this.location = this.activatedRoute.snapshot.params['locatie'];
    this.category = this.activatedRoute.snapshot.params['category'];

    this.userService.getUserDetails().subscribe(data => {
      this.userdata = data;
      //console.log(this.userdata); 

      // this.reporter = this.userdata["name"];
      // console.log(this.reporter);

      localStorage.setItem("userName", this.userdata["name"])

      this.email = data["email"];
    });

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

    this.reactions.push(this.createItem({
      // id: this.be,
      name: '',
      message: this.messages,
      date: this.date
      // datum: this.datePipe.transform(this.datum, 'dd-MM-yyTHH:mm:ss')
    }));

    // console.log(this.uploadForm.value);
    this.ms.postReport(this.uploadForm.value).subscribe((report) => {
      console.log(report)
    });
    // this.ms.postReaction("1", this.uploadForm.value).subscribe((data) => { console.log(data); });
    this.router.navigate(['/tab1']);
  }



  async kiesLocatie() {
    this.navCtrl.navigateForward("/locatie" + "?location=" + this.inputLoc + "?category=" + this.inputCat)
  }

  async kiesCategory() {
    this.navCtrl.navigateForward("/category-select" + "?location=" + this.inputLoc + "?category=" + this.inputCat);
  }

  //Logging the selected date event
  selectedDateTime($event) {
    console.log($event); // --> wil contains $event.day.value, $event.month.value and $event.year.value
  }

  //Binds the date picker component with variable
  dateBind;

  //Hide and show date picker by checking the type of report
  showDateInput($event) {
    // console.log($event);
    if (this.type.value == " Opdracht ") {
      this.showDateSelector = true;
      this.dateBind = this.date.toISOString();
      console.log("Date should be current date: " + this.dateBind);
    }
    else if (this.type.value == " Defect ") {
      this.showDateSelector = false;
      this.dateBind = undefined;
      console.log("Date should always be undefined: " + this.dateBind);
    }
  }

  createItem(data): FormGroup {
    return this.fb.group(data);
  }


  formulier() {
    const reporter = localStorage.getItem("userName")
    this.uploadForm = this.fb.group({

      reporter: [reporter],
      // email: [this.email],
      // datum: [this.datePipe.transform(this.datum, 'dd-MM-yy')],
      date: [this.date],
      type: ['', [Validators.required]],
      requestDate: [this.requestDate],
      location: [this.location],
      category: [this.category],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      locationDescription: ['', [Validators.required, Validators.maxLength(100)]],
      status: [this.status],
      reactions: this.fb.array([]),
      message: [],
      photos: this.fb.array([])
    });
  }

  get reporters() { return this.uploadForm.get("reporter") };
  get pNumbers() { return this.uploadForm.get("pNumber") };
  // get datums() { return this.uploadForm.get("date") };
  get type() { return this.uploadForm.get("type") };
  get reqDate() { return this.uploadForm.get("requestDate") };
  get locations() { return this.uploadForm.get("location") };
  get categories() { return this.uploadForm.get("category") }
  get description() { return this.uploadForm.get("description") };
  get locationDescription() { return this.uploadForm.get("locationDescription") };
  get statuss() { return this.uploadForm.get("status") };
  get reactions(): FormArray { return this.uploadForm.get('reactions') as FormArray; }
  get messages() { return this.uploadForm.get("message") };
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
