import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { File } from '@ionic-native/file/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  afbeelding: any = [];
  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;

  constructor(private imageCompress: NgxImageCompressService, private camera: Camera/*, private file: File*/) {
    console.log(this.afbeelding);
  }


  selectFile(event: any) {
    // var fileName: any;
    this.file = event.target.files[0];
    // fileName = this.file['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.compressFile(this.localUrl/*, fileName*/)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  compressFile(image/*, fileName*/) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    // console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        // console.log(result);
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
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
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }


  // takePhotos() {
  //   let options: CameraOptions = {
  //     quality: 100,
  //     allowEdit: true,
  //     targetWidth: 1000,
  //     targetHeight: 1000,
  //     correctOrientation: true,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     destinationType: this.camera.DestinationType.FILE_URI
  //   }
  //   this.camera.getPicture().then((imagedata) => {
  //     let filename = imagedata.substring(imagedata.lastIndexOf('/') + 1);
  //     let path = imagedata.substring(0, imagedata.lastIndexOf('/') + 1);
  //     this.file.readAsDataURL(path, filename).then(base64data => {
  //       this.afbeelding.push(base64data);
  //     })
  //   })
  // }


  // getImage(sourceType: number) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     targetHeight: 300,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true,
  //     sourceType: sourceType,
  //     saveToPhotoAlbum: false,
  //     allowEdit: false
  //   }

  //   this.camera.getPicture(options).then(imagedata => {
  //     let data = 'data:image/jpeg;base64,' + imagedata;
  //     this.afbeelding.push(data);
  //   });
  // }




}


