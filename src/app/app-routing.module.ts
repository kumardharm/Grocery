import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './com/user/user.component';
import { DashboardModule } from './com/user/dashboard/dashboard.module';


const routes: Routes = [
    { path: '', loadChildren:'./com/user/user.module#UserModule'  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
