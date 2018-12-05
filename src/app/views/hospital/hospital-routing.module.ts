import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Hospital'
    },
    children: [
      {
        path: 'add-hospital',
        loadChildren: './add-hospital/add-hospital.module#AddHospitalModule'
      },
      {
        path: 'search-hospital',
        loadChildren: './search-hospital/search-hospital.module#SearchHospitalModule'
      },
      {
        path: 'edit-hospital/:seqId',
        loadChildren: './edit-hospital/edit-hospital.module#EditHospitalModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }

