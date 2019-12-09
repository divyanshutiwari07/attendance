import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng5-validation';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        CustomFormsModule,

    ],
    declarations: [LoginComponent],

})
export class LoginModule {}
