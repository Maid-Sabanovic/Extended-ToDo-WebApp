import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemService } from './items/item.service';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemComponent } from './items/item-list/item/item.component';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { HttpErrorInterceptorService } from './http-error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent, 
    ItemListComponent,
    HeaderComponent,
    ItemAddComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapConfirmModule
  ],
  providers: [ItemService, {

    provide: HTTP_INTERCEPTORS,

    useClass: HttpErrorInterceptorService,

    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
