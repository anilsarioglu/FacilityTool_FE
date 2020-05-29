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

import { MsalModule, MsalInterceptor, BroadcastService } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

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
    // azure
    MsalModule.forRoot({
      auth: {
        clientId: '0c080e9a-d3cd-4047-8287-42b13b386f97', // This is your client ID
        authority: 'https://login.microsoftonline.com/33d8cf3c-2f14-48c0-9ad6-5d2825533673', // This is your tenant ID
        redirectUri: 'http://localhost:8100/tab1', // This is your redirect URI
        validateAuthority: true,
        navigateToLoginRequestUrl: false,
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
    }, {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    })
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
    NgxImageCompressService,
    BroadcastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // azure
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
