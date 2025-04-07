import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { headerInterceptor } from './_metronic/layout/core/interceptors/header.interceptor';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { LOCALE_ID } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { errorInterceptor } from './_metronic/layout/core/interceptors/error.interceptor';

registerLocaleData(localeAr, 'ar');

function appInitializer() {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    ToastModule,
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    SweetAlert2Module.forRoot(),
  ],

  providers: [
    provideHttpClient(withInterceptors([headerInterceptor, errorInterceptor])),
    MessageService,
    { provide: LOCALE_ID, useValue: 'ar' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
