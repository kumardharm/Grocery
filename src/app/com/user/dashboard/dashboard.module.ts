import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SliderComponent } from '../includes/slider/slider.component';

import { OffersComponent } from '../includes/offers/offers.component';
// import { VegitablesComponent } from '../vegitables/vegitables.component';
import { DiscountComponent } from '../includes/discount/discount.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent,DiscountComponent,OffersComponent,SliderComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
