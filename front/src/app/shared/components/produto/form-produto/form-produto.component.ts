import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DxBulletModule, DxButtonModule, DxFormComponent, DxFormModule, DxNumberBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';

import notify from 'devextreme/ui/notify';
import { Produto } from 'src/app/shared/interfaces/produto';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss']
})
export class FormProdutoComponent implements OnInit {

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
  exports: [ FormProdutoComponent ],
  declarations: [ FormProdutoComponent ]
})
export class FormProdutoModule {}
