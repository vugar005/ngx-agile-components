import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDropdownModule } from 'projects/dropdown/src/lib/dropdown.module';
import { DemoDropdownComponent } from './demo-dropdown/demo-dropdown.component';

@NgModule({
   declarations: [
      AppComponent,
      DemoDropdownComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgxDropdownModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
