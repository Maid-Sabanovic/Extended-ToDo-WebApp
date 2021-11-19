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
  {path: 'todolist', canActivate: [AuthGuardService], component: ItemsComponent,children: [
      { path: 'new', canActivate: [GroupGuardService], data:{group: 'GWS-MA'}, component: ItemAddComponent},
      { path: ':id', canActivate: [GroupGuardService], data:{group: 'GWS-Test'}, component: ItemDetailComponent},
      { path: ':id/edit', component: ItemAddComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
