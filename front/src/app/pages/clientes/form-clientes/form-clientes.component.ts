import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../../shared/interfaces/cliente";
import {
  DxBulletModule,
  DxButtonModule,
  DxFormComponent,
  DxFormModule, DxNumberBoxModule,
  DxTemplateModule,
  DxTextBoxModule
} from "devextreme-angular";
import {ClienteService} from "../../../shared/services/cliente.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import notify from "devextreme/ui/notify";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements OnInit {

  @ViewChild(DxFormComponent, { static: false }) form! : DxFormComponent;

  cliente!: Cliente;
  isPredefined = true;
  predefinedPosition = 'bottom center';
  direction = 'up-push';
  sucesso: string[] = ['success'];
  erro: string[] = ['danger']


  coordinatePosition: object = {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  };


  constructor(private service: ClienteService,
              private location: Location,
              private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.cliente = { id: 0, nome: '', codigo: '' };

    this.service.getById(this.activatedRoute.snapshot.params['id']).subscribe(
      clientes => {
        this.cliente = clientes;
        console.log(this.cliente);
      });
  }


  ngAfterViewInit() {
    this.form.instance.validate();
  }


  voltar(): void {
    this.location.back();
  }

  cancelar(): void {
    this.form.instance.resetValues();
  }

  salvar() {
    this.service.salvarClientes(this.cliente).subscribe(resposta => {
      if(resposta) {
        this.showSucesso();
        this.voltar();
      } else {
        this.showError();
      }
    });
  }



  showSucesso() {
    const position: any = this.isPredefined ? this.predefinedPosition : this.coordinatePosition;
    const direction: any = this.direction;

    if (this.sucesso && this.sucesso.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.sucesso.length);
      const type = this.sucesso[randomIndex];

      notify({
          message: 'Cliente salvo com sucesso!',
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
          message: 'Ocorreu um erro ao salvar cliente',
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
  imports: [  BrowserModule, DxTemplateModule, DxBulletModule, DxButtonModule, DxFormModule,  DxTextBoxModule, DxNumberBoxModule ],
  exports: [ FormClientesComponent ],
  declarations: [ FormClientesComponent]
})
export class FormClienteModule {}
