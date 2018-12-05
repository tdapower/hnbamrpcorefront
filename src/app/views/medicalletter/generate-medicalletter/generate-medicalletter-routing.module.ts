import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateMedicalletterComponent } from './generate-medicalletter.component';


const routes: Routes = [
  {
    path: '',
    component: GenerateMedicalletterComponent,
    data: {
      title: 'Generate Medical Letter'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateMedicalletterRoutingModule {}
