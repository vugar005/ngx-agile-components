import { APIInterceptor } from './../shared/interceptors/api.interceptor';
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
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableDataInsertComponent } from './demo-native-table/table-data-insert/table-data-insert.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { RemoveConfirmComponent } from './demo-native-table/remove-confirm/remove-confirm.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormUtilsModule } from './demo-native-table/form-utils/form-utils.module';

@NgModule({
   declarations: [
      AppComponent,
      DemoDropdownComponent,
      DemoNativeTableComponent,
      TableDataInsertComponent,
      RemoveConfirmComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      NgxDropdownModule,
      NgxNativeTableModule,
      AppRoutingModule,
      HttpClientModule,
      MatMenuModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatSelectModule,
      MatCheckboxModule,
      FormUtilsModule
   ],
   providers: [
     {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true},
     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
   ],
   entryComponents: [
      TableDataInsertComponent,
      RemoveConfirmComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
