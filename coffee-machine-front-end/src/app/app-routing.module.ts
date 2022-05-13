import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeComponent } from './coffee/coffee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MakeCoffeeComponent } from './make-coffee/make-coffee.component';
import { HistogramComponent } from './histogram/histogram.component';
import { TableComponent } from './table/table.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'coffee',
    component: CoffeeComponent

  },
  {
    path:'make',
    component: MakeCoffeeComponent
  },
  {
  path:'histogram',
  component: HistogramComponent
  },
  {
    path:'table',
    component: TableComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
