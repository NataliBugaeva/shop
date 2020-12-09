import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SofaComponent} from './sofa/sofa.component';
import {TableComponent} from './tables/table.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ChairComponent} from './chair/chair.component';
import {AboutSofaComponent} from './sofa/about-sofa/about-sofa.component';
import {AboutChairComponent} from './chair/about-chair/about-chair.component';
import {AboutTableComponent} from './tables/about-table/about-table.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sofas', component: SofaComponent},
  {path: 'sofas/:id', component: AboutSofaComponent},
  {path: 'chairs/:id', component: AboutChairComponent},
  {path: 'tables/:id', component: AboutTableComponent},
  {path: 'chairs', component: ChairComponent},
  {path: 'tables', component: TableComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }