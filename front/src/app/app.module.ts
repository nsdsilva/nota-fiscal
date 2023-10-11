import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SelectboxModule } from './pages/selectbox/selectbox.component';
import { FormClientesComponent } from './pages/clientes/form-clientes/form-clientes.component';
import { ListProdutosComponent } from './pages/produtos/list-produtos/list-produtos.component';
import { FormProdutosComponent } from './pages/produtos/form-produtos/form-produtos.component';
import { ListNotasComponent } from './pages/notas/list-notas/list-notas.component';
import { FormNotasComponent } from './pages/notas/form-notas/form-notas.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule,
    SelectboxModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
