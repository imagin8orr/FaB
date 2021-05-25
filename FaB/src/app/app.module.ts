import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { CardComponent } from './card/card.component';
import { ManageComponent } from './manage/manage.component';

import { FormsModule, FormControl, FormGroup } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CardComponent,
    ManageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, //FormControl, FormGroup,
    MaterialModule,
    // MatCardModule, MatSelectModule, MatOptionModule, MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
