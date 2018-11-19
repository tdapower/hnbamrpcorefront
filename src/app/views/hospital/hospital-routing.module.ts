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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule {}
