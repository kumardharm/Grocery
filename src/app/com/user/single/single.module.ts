import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleRoutingModule } from './single-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SingleComponent } from './single.component';

@NgModule({
  declarations: [SingleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SingleRoutingModule
  ]
})
export class SingleModule { }
