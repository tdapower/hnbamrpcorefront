import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHospitalComponent } from './add-hospital.component';

const routes: Routes = [
  {
    path: '',
    component: AddHospitalComponent,
    data: {
      title: 'Add Hospital'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddHospitalRoutingModule {}
