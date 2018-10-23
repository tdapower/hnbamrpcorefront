import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { AlertModule } from 'ngx-bootstrap/alert';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    AlertModule.forRoot(),
  ],
  declarations: [LoginComponent],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
