import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaysComponent } from './plays/plays.component';
import { DetailComponent } from './plays/detail.component';
import { BorderosDetailComponent } from './borderos-detail/borderos-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaysComponent,
    DetailComponent,
    BorderosDetailComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
