import { RouterModule, Routes } from '@angular/router';

import { DragDropComponent } from './drag-drop/drag-drop.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path:'', component:DragDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
