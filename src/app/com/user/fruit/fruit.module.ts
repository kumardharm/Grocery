import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FruitComponent } from './fruit.component';
import { FruitRoutingModule } from './fruit-routing.module';


@NgModule({
  declarations: [FruitComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FruitRoutingModule
  ]
})
export class FruitModule { }
