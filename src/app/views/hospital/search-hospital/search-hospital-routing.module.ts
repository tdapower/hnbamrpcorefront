import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchHospitalComponent } from './search-hospital.component';

const routes: Routes = [
  {
    path: '',
    component: SearchHospitalComponent,
    data: {
      title: 'Search Hospital'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchHospitalRoutingModule {}
