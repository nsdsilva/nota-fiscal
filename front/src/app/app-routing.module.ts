import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { SelectboxComponent } from './pages/selectbox/selectbox.component';
import {ListClienteComponent} from "./pages/clientes/list-cliente/list-cliente.component";
import {FormClientesComponent} from "./pages/clientes/form-clientes/form-clientes.component";
import {ListProdutosComponent} from "./pages/produtos/list-produtos/list-produtos.component";
import {FormProdutosComponent} from "./pages/produtos/form-produtos/form-produtos.component";
import {ListNotasComponent} from "./pages/notas/list-notas/list-notas.component";
import {FormNotasComponent} from "./pages/notas/form-notas/form-notas.component";


const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'selectbox',
    component: SelectboxComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'clientes',
    component: ListClienteComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'novo-cliente',
    component: FormClientesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'editar-cliente/:id',
    component: FormClientesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'excluir-cliente/:id',
    component: FormClientesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'produtos',
    component: ListProdutosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'novo-produto',
    component: FormProdutosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'editar-produto/:id',
    component: FormProdutosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'excluir-produto/:id',
    component: FormProdutosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'notas',
    component: ListNotasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'nova-nota',
    component: FormNotasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'editar-nota/:id',
    component: FormNotasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'excluir-nota/:id',
    component: FormNotasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent
  ]
})
export class AppRoutingModule { }
