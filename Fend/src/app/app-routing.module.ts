import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routing Components
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ViewOneComponent } from './view-one/view-one.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';




const routes: Routes = [
  { path: 'Add-Employee', component: AddEmployeeComponent},
  { path: 'View-Employee', component: ViewEmployeeComponent},
  { path: 'User/:id', component: ViewOneComponent},
  { path: 'Edit/:id', component: EditEmployeeComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
