import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import {UserAccountComponent} from './user-account.component';


@NgModule({
  declarations: [
    UserAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UserAccountModule { }
