import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { SelectboxComponent } from './pages/selectbox/selectbox.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { FormClienteComponent } from './shared/components/cliente/form-cliente/form-cliente.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { FormProdutoComponent } from './shared/components/produto/form-produto/form-produto.component';
import { NotaComponent } from './pages/nota/nota.component';
import { FormNotaComponent } from './shared/components/nota/form-nota/form-nota.component';


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
    component: ClienteComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'novo-cliente',
    component: FormClienteComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'editar-cliente/:id',
    component: FormClienteComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'excluir-cliente/:id',
    component: FormClienteComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'produtos',
    component: ProdutoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'novo-produto',
    component: FormProdutoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'editar-produto/:id',
    component: FormProdutoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'excluir-produto/:id',
    component: FormProdutoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'notas',
    component: NotaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'nova-nota',
    component: FormNotaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'editar-nota/:id',
    component: FormNotaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'excluir-nota/:id',
    component: FormNotaComponent,
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
