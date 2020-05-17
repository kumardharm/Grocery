import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [

  {
    path: '',
    component:UserComponent,
    children: [
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusModule' },
    { path: 'deal', loadChildren: './deals/deals.module#DealsModule' },
    { path: 'event', loadChildren: './events/events.module#EventsModule' },
    { path: 'service', loadChildren: './services/services.module#ServicesModule' },
    { path: 'single', loadChildren: './single/single.module#SingleModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule' },
    { path: 'vegitables', loadChildren: './vegitables/vegitables.module#VegitablesModule' },
    { path: 'fruit', loadChildren: './fruit/fruit.module#FruitModule' },
    { path: 'invoice', loadChildren: './invoice/invoice.module#InvoiceModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
    { path: 'search', loadChildren: './search/search.module#SearchModule' },
    { path: 'address', loadChildren: './address/address.module#AddressModule' }
    ]
    
    } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
