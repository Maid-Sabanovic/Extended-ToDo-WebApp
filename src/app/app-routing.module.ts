import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { GroupGuardService } from './group-guard.service';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemsComponent } from './items/items.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'todolist', canActivate: [AuthGuardService], canActivateChild: [GroupGuardService] , component: ItemsComponent,children: [
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
