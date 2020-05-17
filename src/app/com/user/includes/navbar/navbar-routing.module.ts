import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from '../../aboutus/aboutus.component';
import { LoginComponent } from '../../login/login.component';

const routes: Routes = [
  { path: 'About', component: AboutusComponent },
  { path: 'about', redirectTo: 'About' ,pathMatch: 'prefix'  },
  // { path: 'Login', component: LoginComponent },
  // { path: 'login', redirectTo: 'Login' ,pathMatch: 'prefix'  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
