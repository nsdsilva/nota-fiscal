import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {
  DxAutocompleteModule,
  DxBulletModule,
  DxButtonModule, DxDataGridComponent,
  DxDataGridModule, DxDateBoxModule,
  DxFormComponent,
  DxFormModule, DxGanttModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule,
  DxTemplateModule, DxTextBoxModule
} from "devextreme-angular";
import {Nota} from "../../../shared/interfaces/nota";
import {Cliente} from "../../../shared/interfaces/cliente";
import {Itens} from "../../../shared/interfaces/itens";
import {ClienteService} from "../../../shared/services/cliente.service";
import {NotaService} from "../../../shared/services/nota.service";
import {ActivatedRoute, Router} from "@angular/router";
import notify from "devextreme/ui/notify";
import { Location } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {ItensModule} from "../../../shared/components/itens/itens.component";
import {DxoLookupModule} from "devextreme-angular/ui/nested";
import {FormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {ProdutoService} from "../../../shared/services/produto.service";

@Component({
  selector: 'app-form-notas',
  templateUrl: './form-notas.component.html',
  styleUrls: ['./form-notas.component.scss']
})
export class FormNotasComponent implements OnInit {

  @ViewChild(DxFormComponent, {static: false}) form!: DxFormComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  private produtoSubject = new BehaviorSubject<any>(null);
  private quantidadeSubject = new BehaviorSubject<number>(0);
  private valorUnitarioSubject = new BehaviorSubject<number>(0);
  private ordemSubject = new BehaviorSubject<number>(0);

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
  quantidade: any;


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
              private activatedRoute: ActivatedRoute) {

    this.calculateTotalValue = this.calculateTotalValue.bind(this);
  }

  ngOnInit(): void {
    this.notas = {
      id: 0, cliente: {id: 0, codigo: '', nome: ''},
      itens: [], numero: 0, data: new Date(), valor_total: 0,
    };


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

    //Atualizando a coluna de produto
    this.produtoSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateValorTotal();
    });

    // Atualizando a coluna quantidade
    this.quantidadeSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateValorTotal();
    });

    // Atualizando a coluna valor_unitario
    this.valorUnitarioSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateValorTotal();
    });

    // Atualizando a coluna ordenaçao
    this.ordemSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateValorTotal();
    });
  }


  //Carregando o cliente digitado no autocomplete de acordo com o nome que foi digitado
  updateClientesInfo(e: any) {
    const cliente = e.value;

    this.clienteService.getByNome(cliente).subscribe((resultado) => {
      this.listaClientes = resultado;
    });
  }


//Carregando os produtos que são apresentados na column de produtos do datagrid
  updateProdutoInfo() {
    this.produtoService.listarProdutos().subscribe(produtos => {
      if (produtos)
        this.dataSourceProdutos = produtos;
    });
  }

//Inserindo os dados na linha
  onRowInserted(event: any) {
    const produtoSelecionadoId = event.data.produto;
    const quantidade = event.data.quantidade;

    this.produtoService.getById(produtoSelecionadoId).subscribe((produto) => {
      if (produto && quantidade) {
        const newItem: Itens = {
          produto: produto,
          nota: event.data.nota,
          ordenacao: event.data.ordenacao,
          quantidade: quantidade,
          valor_total: event.data.valor_total
        };
        this.items.push(newItem);

        this.produtoSubject.next(produto);
        this.quantidadeSubject.next(quantidade);
        this.valorUnitarioSubject.next(produto.valor_unitario);
        this.ordemSubject.next(event.data.ordenacao);
      }
    });
  }

//Apresenta o valor unitário do produto que é selecionado na linha
  valorUnitarioTemplate = (container: any, options: any) => {
    const produtoID = options.data.produto;
    const produtoSelecionado = this.dataSourceProdutos.find(prod => prod.id === produtoID);

    if (produtoSelecionado) {
      const valorFormatado = produtoSelecionado.valor_unitario.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      container.append(valorFormatado);
    } else {
      container.append('');
    }
  }


  //Apresenta o valor total do produto na linha
  calculateTotalValue(data: any): number {
    if (data.produto && data.quantidade) {
      const produtoSelecionado = this.dataSourceProdutos.find(prod => prod.id === data.produto);
      return produtoSelecionado.valor_unitario * data.quantidade;
    }
    return 0;
  }


//Recarrego os valores (alterações) de acordo com o que foi atualizado na digitação da linha
  updateValorTotal() {
    const produto = this.produtoSubject.getValue();
    const quantidade = this.quantidadeSubject.getValue();
    const valorUnitario = this.valorUnitarioSubject.getValue();
    const ordem = this.ordemSubject.getValue();

    if (produto && quantidade && valorUnitario) {
      const valorTotal = produto.valor_unitario * quantidade;

      this.dataGrid.instance.cellValue(this.dataGrid.instance.getSelectedRowKeys()[0], 'valor_total', valorTotal);
    }
  }

   novoCliente() {
    this.router.navigate(['/novo-cliente']);
  }


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
    DxSelectBoxModule, DxoLookupModule, FormsModule, DxGanttModule ],
  exports: [ FormNotasComponent ],
  declarations: [ FormNotasComponent ],
})
export class FormNotaModule {}
