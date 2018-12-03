import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';

import { AuthGuard } from './authGuard';

export const routes: Routes = [
  { 
    path: '', 
    component: DefaultLayoutComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard] ,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      
      {
        path: 'forms',
        loadChildren: './views/forms/forms.module#FormsModule'
      },
   
      {
        path: 'customer',
        loadChildren: './views/customer/customer.module#CustomerModule'
      },
      {
        path: 'hospital',
        loadChildren: './views/hospital/hospital.module#HospitalModule'
      },
      {
        path: 'workflowjob',
        loadChildren: './views/workflowjob/workflowjob.module#WorkflowjobModule'
      }, 
      {
        path: 'medicalletter',
        loadChildren: './views/medicalletter/medicalletter.module#MedicalletterModule'
      }, 
       {
        path: 'proposal',
        loadChildren: './views/proposal/proposal.module#ProposalModule'
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
