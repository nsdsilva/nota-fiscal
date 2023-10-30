import {Component, NgModule, OnInit} from '@angular/core';
import {Nota} from "../../../shared/interfaces/nota";
import {NotaService} from "../../../shared/services/nota.service";
import {Router} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule} from "devextreme-angular";
import notify from "devextreme/ui/notify";

@Component({
  selector: 'app-list-notas',
  templateUrl: './list-notas.component.html',
  styleUrls: ['./list-notas.component.scss']
})
export class ListNotasComponent implements OnInit {

  dataSource: Nota[] = [];
  linhaSelecionada: any;
  isPredefined = true;
  predefinedPosition = 'bottom center';
  direction = 'up-push';
  sucesso: string[] = ['success'];
  erro: string[] = ['danger'];
  alerta: string[] = ['warning'];

  coordinatePosition: object = {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  };


  constructor(private service: NotaService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.listarNotas();
  }


  listarNotas() {
    this.service.listarNotas().subscribe(resposta => {
      this.dataSource = resposta;
    });
  }

  onRowClick(e: any) {
    this.linhaSelecionada = e.data.id;
    this.router.navigate(['/editar-nota', this.linhaSelecionada]);
  }


  validateRemove(e: any) {
    this.linhaSelecionada = e.data.id;

    this.service.deletarProdutos(this.linhaSelecionada).subscribe(resposta => {
      if(resposta) {
        this.showSucesso();
        this.listarNotas();
      } else {
        this.showError();
      }
    })
  }

  novaNota() {
    this.router.navigate(['/nova-nota']);
  }


  showSucesso() {
    const position: any = this.isPredefined ? this.predefinedPosition : this.coordinatePosition;
    const direction: any = this.direction;

    if (this.sucesso && this.sucesso.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.sucesso.length);
      const type = this.sucesso[randomIndex];

      notify({
          message: 'A Nota Fiscal foi excluída com sucesso!',
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
          message: 'Ocorreu um erro ao excluir a nota Fiscal',
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

  showMessage(message: String) {
    const position: any = this.isPredefined ? this.predefinedPosition : this.coordinatePosition;
    const direction: any = this.direction;

    if (this.sucesso && this.erro.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.sucesso.length);
      const type = this.alerta[randomIndex];

      notify({
          message: message,
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

}

@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule ],
  exports: [ ListNotasComponent ],
  declarations: [ ListNotasComponent ]
})
export class ListNotaModule {}
