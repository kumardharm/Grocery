import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VegitablesComponent } from './vegitables.component';

const routes: Routes = [
  {
    path: '',
    component:VegitablesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VegitablesRoutingModule { }