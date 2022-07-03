import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './_guards/auth-guard.service';
import { GroupGuardService } from './_guards/group-guard.service';
import { SearchComponent } from './components/search/search.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ItemAddComponent } from './components/items/item-add/item-add.component';
import { ItemDetailComponent } from './components/items/item-detail/item-detail.component';
import { ItemsComponent } from './components/items/items.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'search', canActivate: [AuthGuardService], component: SearchComponent},
  {path: 'todolist', canActivate: [AuthGuardService], component: ItemsComponent,children: [
      { path: 'new', component: ItemAddComponent},
      { path: ':id',  component: ItemDetailComponent},
      { path: ':id/edit', component: ItemAddComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
