import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {HomeModule} from './home/home.module';
import {SofaModule} from './sofa/sofa.module';
import {ChairModule} from './chair/chair.module';
import {TableModule} from './tables/tablemodule';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';

import {AllProductsModule} from './all-products/all-products.module';
import { BasketComponent } from './basket/basket.component';
import {BasketModule} from './basket/basket.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HomeModule,
    SofaModule,
    ChairModule,
    TableModule,
    AngularFireAuthModule,
    FormsModule,
    AllProductsModule,
    BasketModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
