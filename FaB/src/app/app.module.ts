import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LoaderModule } from './loader/loader.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagInputModule } from 'ngx-chips';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { HeaderComponent } from './header/header.component';
import { AddEditCardComponent } from './cards/add-edit-card/add-edit-card.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewCardComponent } from './cards/view-card/view-card.component';
import { RegisterComponent } from './register/register.component';
import { MyCardsComponent } from './cards/my-cards/my-cards.component';
import { DeckListComponent } from './deck/deck-list/deck-list.component';
import { ViewDeckComponent } from './deck/view-deck/view-deck.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TestComponent } from './deck/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    HeaderComponent,
    AddEditCardComponent,
    LoginRegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ViewCardComponent,
    RegisterComponent,
    MyCardsComponent,
    DeckListComponent,
    ViewDeckComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut:5000,
      extendedTimeOut: 5000,
      titleClass:'none-custom'
    }),
    LoaderModule,
    NgMultiSelectDropDownModule.forRoot(),
    TagInputModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
