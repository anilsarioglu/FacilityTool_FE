import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePipe, DecimalPipe } from '@angular/common';

import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ImageModalPage } from './image-modal/image-modal.page';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

@NgModule({
  declarations: [AppComponent, ImageModalPage],
  entryComponents: [ImageModalPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2ImgMaxModule,
    NgxDatatableModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    DecimalPipe,
    Camera,
    File,
    PhotoViewer,
    ImagePicker,
    BarcodeScanner,
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
