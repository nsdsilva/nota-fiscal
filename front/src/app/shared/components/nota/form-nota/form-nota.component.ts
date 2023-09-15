import { Nota } from './../../../interfaces/nota';
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DxAutocompleteModule, DxBulletModule, DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormComponent, DxFormModule, DxNumberBoxModule, DxPopupModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';

import notify from 'devextreme/ui/notify';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { NotaService } from 'src/app/shared/services/nota.service';
import { Location } from '@angular/common';
import { ItensModule } from '../../itens/itens.component';
import { Cliente } from '../../../interfaces/cliente';

import { Itens } from '../../../interfaces/itens';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-form-nota',
  templateUrl: './form-nota.component.html',
  styleUrls: ['./form-nota.component.scss']
})
export class FormNotaComponent implements OnInit {

  @ViewChild(DxFormComponent, { static: false }) form! : DxFormComponent;


  notas!: Nota;
  listaClientes: Cliente[] = [];
  clienteSalvo: any;
  dataSource: Itens[] = [];
  dataSourceProdutos: any[] = [];
  items: Itens[] = [];
  nome = '';
  isPredefined = true;
  predefinedPosition = 'bottom center';
  direction = 'up-push';
  sucesso: string[] = ['success'];
  erro: string[] = ['danger'];
  produtoSelecionado: any;

  coordinatePosition: object = {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  };



  constructor(private clienteService: ClienteService,
              private produtoService: ProdutoService,
              private service: NotaService,
              private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}



  ngOnInit(): void {
    this.notas = {id: 0, cliente: {}, itens: [], numero: 0, data: new Date(), valor_total: 0};

    this.service.getById(this.activatedRoute.snapshot.params['id']).subscribe(
      notas => {
        this.notas = notas;
        this.dataSource = notas.itens;

        for (const i of notas.itens) {
          const produto = i.produto?.descricao;
          this.dataSourceProdutos.push(produto);
        }

        this.clienteSalvo = this.notas.cliente.nome;
      });

      this.updateProdutoInfo();
  }



  updateClientesInfo(e: any) {
    const cliente = e.value;

      this.clienteService.getByNome(cliente).subscribe((resultado) => {
          this.listaClientes = resultado;
      });
  }



  updateProdutoInfo() {
    this.produtoService.listarProdutos().subscribe(produtos => {
      this.dataSourceProdutos = produtos;
    });
  }



  calcularValorUnitario(row: any) {
    if (row.produto) {
      return row.produto.valor_unitario;
    } else {
      return 0;
    }
  }



  novoCliente() {
    this.router.navigate(['/novo-cliente']);
  }


  onRowInserted(event: any) {
    const newItem: Itens = {

      produto: event.data.produto,
      nota: event.data.nota,
      ordenacao: event.data.ordenacao,
      quantidade: event.data.quantidade,
      valor_total: event.data.valor_total
    };

    this.items.push(newItem);
  }



  salvar() {
    if (this.clienteSalvo) {
      const clienteSelecionado = this.listaClientes.find(cliente => cliente.nome === this.clienteSalvo);

      if (clienteSelecionado) {
        this.notas.cliente = clienteSelecionado;
        this.notas.itens = this.items;

        console.log('Cliente ', this.notas.cliente);
        console.log('Itens ', this.items);
        console.log('Produto ', );

        this.service.salvarNota(this.notas).subscribe((resposta) => {
          if (resposta) {
            this.showSucesso();
            this.voltar();
          } else {
            this.showError();
          }
        });
      } else {
        console.error('Cliente não encontrado com o nome informado.');
      }
    } else {
      console.error('Nenhum cliente foi selecionado antes de salvar a nota.');
    }
  }



  cancelar() {
    this.form.instance.resetValues();
  }



  voltar() {
    this.location.back();
  }



  showSucesso() {
    const position: any = this.isPredefined ? this.predefinedPosition : this.coordinatePosition;
    const direction: any = this.direction;

    if (this.sucesso && this.sucesso.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.sucesso.length);
        const type = this.sucesso[randomIndex];

        notify({
            message: 'A Nota Fiscal foi salva com sucesso!',
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
            message: 'Ocorreu um erro ao salvar a nota Fiscal',
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
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule,DxFormModule,
              DxNumberBoxModule, DxTextBoxModule,DxAutocompleteModule, DxDateBoxModule, ItensModule, DxPopupModule ],
  exports: [ FormNotaComponent ],
  declarations: [ FormNotaComponent ]
})
export class FormNotaModule {}

