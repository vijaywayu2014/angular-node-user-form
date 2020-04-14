import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-form' },
  { path: 'user-form', component: UserFormComponent},
  { path: 'user-list', component: UserListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }