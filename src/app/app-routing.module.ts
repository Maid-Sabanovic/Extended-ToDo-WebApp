import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {path: '', redirectTo: '/todolist', pathMatch: 'full'},
  {path: 'todolist', component: ItemsComponent, children: [
      { path: 'new', component: ItemAddComponent},
      { path: ':id', component: ItemDetailComponent},
      { path: ':id/edit', component: ItemAddComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
