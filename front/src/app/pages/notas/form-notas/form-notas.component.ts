import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {
  DxAutocompleteModule,
  DxBulletModule,
  DxButtonModule,
  DxDataGridModule, DxDateBoxModule,
  DxFormComponent,
  DxFormModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule,
  DxTemplateModule, DxTextBoxModule
} from "devextreme-angular";
import {Nota} from "../../../shared/interfaces/nota";
import {Cliente} from "../../../shared/interfaces/cliente";
import {Itens} from "../../../shared/interfaces/itens";
import {ClienteService} from "../../../shared/services/cliente.service";
import {ProdutoService} from "../../../shared/services/produto.service";
import {NotaService} from "../../../shared/services/nota.service";
import {ActivatedRoute, Router} from "@angular/router";
import notify from "devextreme/ui/notify";
import { Location } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {ItensModule} from "../../../shared/components/itens/itens.component";

@Component({
  selector: 'app-form-notas',
  templateUrl: './form-notas.component.html',
  styleUrls: ['./form-notas.component.scss']
})
export class FormNotasComponent implements OnInit {

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
  searchModeOption = 'startswith';
  searchExprOption: any = 'descricao';
  showDataBeforeSearchOption = false;
  searchTimeoutOption = 200;
  valorProdutoSelecionado: any;
  produtoSelecionado: any;
  valorTotal: any;
  quantidade: any;
  valorTotalSumary: any;

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
    this.notas = {id: 0, cliente: {id: 0, codigo: '', nome: ''},
      itens: [], numero: 0, data: new Date(), valor_total: 0};


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


  onEditorPreparing(e: any) {
    if (e.dataField === 'quantidade') {
      e.editorOptions.onValueChanged = (digitado: any) => {
        this.quantidade = digitado.value;
      };
    }
  }

  onProdutoSelecionado(e: any) {
    const produtoSelecionadoId = e.value;
    const prodSelecionado = this.dataSourceProdutos.find(prod => prod.id === produtoSelecionadoId);

    if (prodSelecionado) {
      this.produtoSelecionado = prodSelecionado.id;
      this.valorProdutoSelecionado = prodSelecionado.valor_unitario;
    } else {
      this.valorProdutoSelecionado = null;
    }
  }

  calcularValorTotal(e: any) {
    return this.valorTotal = this.quantidade * this.valorProdutoSelecionado;
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

  calculateSummary(options: any) {
    // Calculating "customSummary1"
    if(options.name == "customSummary1") {
      switch(options.summaryProcess) {
        case "start":
          this.valorTotalSumary = 0;
          break;
        case "calculate":
          this.valorTotalSumary += this.valorTotal;
          break;
        case "finalize":
          this.valorTotalSumary;
          break;
      }
    }

    // Calculating "customSummary2"
    if(options.name == "customSummary2") {
      // ...
      // Same "switch" statement here
    }
  };


  salvar() {
    if (this.clienteSalvo) {
      const clienteSelecionado = this.listaClientes.find(cliente => cliente.nome === this.clienteSalvo);

      if (clienteSelecionado) {
        this.notas.cliente = clienteSelecionado;
        this.notas.itens = this.items;

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
  imports: [BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule, DxFormModule,
    DxNumberBoxModule, DxTextBoxModule, DxAutocompleteModule, DxDateBoxModule, ItensModule, DxPopupModule, DxSelectBoxModule,
    DxSelectBoxModule],
  exports: [ FormNotasComponent ],
  declarations: [ FormNotasComponent ]
})
export class FormNotaModule {}
