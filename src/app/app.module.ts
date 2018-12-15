import { TokenInterceptor } from './../shared/interceptors/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDropdownModule } from 'projects/dropdown/src/lib/dropdown.module';
import { DemoDropdownComponent } from './demo-dropdown/demo-dropdown.component';
import { DemoNativeTableComponent } from './demo-native-table/demo-native-table.component';
import { NgxNativeTableModule } from 'projects/native-table/src/lib/native-table.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
   declarations: [
      AppComponent,
      DemoDropdownComponent,
      DemoNativeTableComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgxDropdownModule,
      NgxNativeTableModule,
      HttpClientModule
   ],
   providers: [
     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
