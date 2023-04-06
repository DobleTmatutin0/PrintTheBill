import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { PlaysComponent } from './plays/plays.component';
import { DetailComponent } from './plays/detail.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plays', component: PlaysComponent },
  { path: 'plays/:id', component: DetailComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
