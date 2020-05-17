import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AddressComponent } from './address.component';
import { AddressRoutingModule } from './address-routing.module';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    AddressRoutingModule,
    DataTablesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddressModule { }

