import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {AppRoutingModule} from '../app-routing.module';
import {HomeRoutingModule} from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
   /* AppRoutingModule,*/
    HomeRoutingModule
  ],
 /* exports: [
    HomeComponent
  ],*/
  providers: []
})
export class HomeModule { }
