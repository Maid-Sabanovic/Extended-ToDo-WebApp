import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailComponent } from './components/items/item-detail/item-detail.component';
import { ItemListComponent } from './components/items/item-list/item-list.component';
import { ItemService } from './_services/item.service';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { HttpErrorInterceptorService } from './_interceptor/http-error-interceptor.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MyAuthService } from './_services/my-auth.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuardService } from './_guards/auth-guard.service';
import { GroupGuardService } from './_guards/group-guard.service';
import { SearchComponent } from './components/search/search.component';
import { ItemSearchService } from './_services/item-search.service';
import { DataTablesModule } from 'angular-datatables';
import { ItemAddComponent } from './components/items/item-add/item-add.component';
import { ItemComponent } from './components/items/item-list/item/item.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    ItemListComponent,
    HeaderComponent,
    ItemAddComponent,
    ItemComponent,
    WelcomeComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgxBootstrapConfirmModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://localhost:44316/api/TodoItems', 'https://localhost:44316/api/ADInfo', 'https://localhost:44316/api/ADInfo/GetFullName', 'https://localhost:44316/api/ADInfo/GetUserGroups'],
        sendAccessToken: true
      }
    })
  ],
  providers: [ItemService, ItemSearchService, MyAuthService, AuthGuardService, GroupGuardService, {

    provide: HTTP_INTERCEPTORS,

    useClass: HttpErrorInterceptorService,

    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
