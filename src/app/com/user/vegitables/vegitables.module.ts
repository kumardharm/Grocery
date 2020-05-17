import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VegitablesRoutingModule } from './vegitables-routing.module';
import { VegitablesComponent } from './vegitables.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VegitablesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VegitablesRoutingModule
  ]
})
export class VegitablesModule { }
