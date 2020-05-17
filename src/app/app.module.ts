import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
   AppComponent
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
   AppRoutingModule,
   HttpClientModule,
   FormsModule,
   ReactiveFormsModule,
   RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
