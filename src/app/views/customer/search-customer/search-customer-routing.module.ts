import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchCustomerComponent } from './search-customer.component';

const routes: Routes = [
  {
    path: '',
    component: SearchCustomerComponent,
    data: {
      title: 'Edit Customer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCustomerRoutingModule {}
