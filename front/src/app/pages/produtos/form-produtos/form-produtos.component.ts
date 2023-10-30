import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {
  DxBulletModule,
  DxButtonModule,
  DxFormComponent,
  DxFormModule, DxNumberBoxModule,
  DxTemplateModule,
  DxTextBoxModule
} from "devextreme-angular";
import {Produto} from "../../../shared/interfaces/produto";
import {ProdutoService} from "../../../shared/services/produto.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";

import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.scss']
})
export class FormProdutosComponent implements OnInit {

  @ViewChild(DxFormComponent, { static: false }) form! : DxFormComponent;

  produto!: Produto;
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


  constructor(private service: ProdutoService,
              private location: Location,
              private activatedRoute: ActivatedRoute) {}



  ngOnInit(): void {
    this.produto = {id: 0, descricao: '', codigo: '', valor_unitario: 0};

    this.service.getById(this.activatedRoute.snapshot.params['id']).subscribe(
      produto => {
        this.produto = produto;
      });
  }



  ngAfterViewInit() {
    this.form.instance.validate();
  }


  voltar() {
    this.location.back();
  }


  cancelar() {
    this.form.instance.resetValues();
  }


  salvar() {
    this.service.salvarProdutos(this.produto).subscribe(resposta => {
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
          message: 'Produto salvo com sucesso!',
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
          message: 'Ocorreu um erro ao salvar produto',
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
  exports: [ FormProdutosComponent ],
  declarations: [ FormProdutosComponent ]
})
export class FormProdutoModule {}
