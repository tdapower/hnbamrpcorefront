import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Medical Letter'
    },
    children: [
      {
        path: 'generate-medicalletter',
        loadChildren: './generate-medicalletter/generate-medicalletter.module#GenerateMedicalletterModule'
      } 
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalLetterRoutingModule {}
