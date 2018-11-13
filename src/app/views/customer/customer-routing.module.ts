import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer'
    },
    children: [
      {
        path: 'add-customer',
        loadChildren: './add-customer/add-customer.module#AddCustomerModule'
      },
      {
        path: 'edit-customer/:id',
        loadChildren: './edit-customer/edit-customer.module#EditCustomerModule'
      },
      {
        path: 'search-customer',
        loadChildren: './search-customer/search-customer.module#SearchCustomerModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
