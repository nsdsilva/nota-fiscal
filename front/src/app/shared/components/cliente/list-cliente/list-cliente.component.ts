import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxLoadPanelModule, DxTemplateModule } from 'devextreme-angular';


import notify from 'devextreme/ui/notify';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';




@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.scss']
})
export class ListClienteComponent implements OnInit {

  dataSource: Cliente[] = [];
  linhaSelecionada: any;
  isPredefined = true;
  predefinedPosition = 'bottom center';
  direction = 'up-push';
  sucesso: string[] = ['success'];
  erro: string[] = ['danger'];
  loadingVisible = false;
  clienteInfo: any = {};

  coordinatePosition: object = {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  };

  constructor(private service: ClienteService,
              private router: Router) {}



  ngOnInit(): void {
    this.listaCliente();
  }



  listaCliente() {
    this.clienteInfo = {};
    this.loadingVisible = true;

    this.service.listaClientes().subscribe((resposta: Cliente[]) => {
      console.log(resposta);
      this.dataSource = resposta;
    })
  }


  novoCliente() {
    this.router.navigate(['/novo-cliente']);
  }


  onRowClick(event: any): void {
    this.linhaSelecionada = event.data.id;
    this.router.navigate(['/editar-cliente', this.linhaSelecionada]);
  }


  validateRemove(e: any) {
    this.linhaSelecionada = e.data.id;

    this.service.deletarCliente(this.linhaSelecionada).subscribe(resposta => {
      if(resposta) {
        this.showSucesso();
        this.listaCliente();
      } else {
        this.showError();
      }
    })
  }


  showSucesso() {
    const position: any = this.isPredefined ? this.predefinedPosition : this.coordinatePosition;
    const direction: any = this.direction;

    if (this.sucesso && this.sucesso.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.sucesso.length);
        const type = this.sucesso[randomIndex];

        notify({
            message: 'Cliente excluído com sucesso!',
            height: 45,
            width: 500,
            minWidth: 150,
            type: type.toLowerCase(),
            displayTime: 3500,
            animation: {
                show: { type: 'fade', duration: 400, from: 0, to: 1 },
                hide: { type: 'fade', duration: 40, to: 0 },
            },
        },
        { position, direction });
    } else {
        console.error("Array 'sucesso' não definido ou vazio.");
    }
  }



  showError() {
    const position: any = this.isPredefined ? this.predefinedPosition : this.coordinatePosition;
    const direction: any = this.direction;

    if (this.sucesso && this.erro.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.sucesso.length);
        const type = this.sucesso[randomIndex];

        notify({
            message: 'Ocorreu um erro ao excluir cliente',
            height: 45,
            width: 500,
            minWidth: 150,
            type: type.toLowerCase(),
            displayTime: 3500,
            animation: {
                show: { type: 'fade', duration: 400, from: 0, to: 1 },
                hide: { type: 'fade', duration: 40, to: 0 },
            },
        },
        { position, direction });
    } else {
        console.error("Array 'erro' não definido ou vazio.");
    }
  }


  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 3000);
  }


  onHidden() {
    this.clienteInfo = this.dataSource;
  }
}





@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule, DxLoadPanelModule ],
  exports: [ ListClienteComponent ],
  declarations: [ ListClienteComponent ]
})
export class ListClienteModule {}
