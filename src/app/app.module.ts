import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';

import {HomeModule} from './home/home.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AllProductsModule} from './all-products/all-products.module';
import {BasketModule} from './basket/basket.module';
import {ComparisonModule} from './comparison/comparison.module';
import {OrderModule} from './order/order.module';

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
    AngularFireAuthModule,
    FormsModule,
    AllProductsModule,
    BasketModule,
    ComparisonModule,
    OrderModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
