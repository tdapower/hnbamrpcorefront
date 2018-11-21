import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHospitalComponent } from './edit-hospital.component';

const routes: Routes = [
  {
    path: '',
    component: EditHospitalComponent,
    data: {
      title: 'Edit Hospital'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditHospitalRoutingModule {}
