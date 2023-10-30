import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {
  DxAutocompleteModule,
  DxBulletModule,
  DxButtonModule, DxDataGridComponent,
  DxDataGridModule, DxDateBoxModule,
  DxFormComponent,
  DxFormModule, DxLookupModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule,
  DxTemplateModule, DxTextBoxModule, DxValidationGroupModule
} from "devextreme-angular";
import {Nota} from "../../../shared/interfaces/nota";
import {Cliente} from "../../../shared/interfaces/cliente";
import {Itens} from "../../../shared/interfaces/itens";
import {ClienteService} from "../../../shared/services/cliente.service";
import {NotaService} from "../../../shared/services/nota.service";
import {ActivatedRoute, Router} from "@angular/router";
import notify from "devextreme/ui/notify";
import {BrowserModule} from "@angular/platform-browser";
import {ItensModule} from "../../../shared/components/itens/itens.component";
import {FormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {ProdutoService} from "../../../shared/services/produto.service";
import {Produto} from "../../../shared/interfaces/produto";

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

  private ordenacao: number = 0;

  notas!: Nota;
  listaClientes: Cliente[] = [];
  clienteSalvo: any;
  produtoSalvo: any;
  dataSourceProdutos: any[] = [];
  items: Itens[] = [];
  produto!: Produto;
  notaID: number = 0;
  nome = '';
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

  constructor(private clienteService: ClienteService,
              private produtoService: ProdutoService,
              private service: NotaService,
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
        this.items = notas.itens;
        this.notaID = notas.id;

        let maxOrdenacao = 0;

        for (const i of notas.itens) {
          this.produtoSalvo = i.produto;
          this.ordenacao = i.ordenacao;

          if (this.ordenacao > maxOrdenacao) {
            maxOrdenacao = this.ordenacao;
          }

          this.dataSourceProdutos.push( this.produtoSalvo);
        }
        this.carregarItensNota(this.notaID);
        this.clienteSalvo = this.notas.cliente.nome;
      });

    this.updateProdutoInfo();
    this.updateClientesInfo();

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
  }


  //Carregando o cliente digitado no autocomplete de acordo com o nome que foi digitado
  updateClientesInfo() {
    this.clienteService.listaClientes().subscribe((resultado) => {
        this.listaClientes = resultado;
    });
  }

//Carregando os produtos que são apresentados na column de produtos do datagrid
  updateProdutoInfo() {
    this.produtoService.listarProdutos().subscribe(produtos => {
      this.dataSourceProdutos = produtos;
    });
  }


  carregarItensNota(notaId: number) {
    this.service.getById(notaId).subscribe((nota) => {
      if (nota && nota.itens) {
        console.log('Minha lista carregada', nota.itens);
        this.notas.itens = nota.itens;
        this.items = this.notas.itens;
      }
    });
  }


//Inserindo os dados na linha
  onRowInserted(event: any) {
    const produtoSelecionadoId = event.data.produto.id;

    // Verifique se o item já existe na lista
    const itemExistente = this.items.find(item => item.produto.id === produtoSelecionadoId);

    if (!itemExistente) {
      // Se o item não existe, então adicione-o
      const quantidade = event.data.quantidade;

      this.produtoService.getById(produtoSelecionadoId).subscribe((produto) => {
        if (produto && quantidade) {
          const ordenacao = this.items.length + 1;
          const newItem: Itens = {
            produto: produto,
            nota: event.data.nota,
            ordenacao: ordenacao,
            quantidade: quantidade,
            valor_total: event.data.valor_total
          };
          this.items.push(newItem);

          this.produtoSubject.next(produto);
          this.quantidadeSubject.next(quantidade);
          this.valorUnitarioSubject.next(produto.valor_unitario);
        }
      });
    }
  }


  //Apresenta o valor total do produto na linha
  calculateTotalValue(data: any): number {
    if (data.produto && data.quantidade) {
      const prodId = data.produto.id;
      const quantidade = data.quantidade;

      const produto = this.dataSourceProdutos.find((p) => p.id === prodId);

      if (produto) {
        const valorTotal = produto.valor_unitario * quantidade;
        return valorTotal;
      }
    }
    return 0;
  }


  //Recarrego os valores (alterações) de acordo com o que foi atualizado na digitação da linha
  updateValorTotal() {
    const produto = this.produtoSubject.getValue();
    const quantidade = this.quantidadeSubject.getValue();
    const valorUnitario = this.valorUnitarioSubject.getValue();

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
      const clienteSelecionado = this.listaClientes.find(c => c.nome === this.clienteSalvo);

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
        this.showMessage('É necessário adicionar pelo menos um cliente.');
        console.error('Cliente não encontrado com o nome informado.');
      }
    } else {
      this.showMessage('É necessário adicionar pelo menos um cliente.');
    }
  }

  cancelar() {
    this.form.instance.resetValues();
  }

  voltar() {
    this.router.navigate(['/notas']);
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
  imports: [BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule, DxFormModule,
    DxNumberBoxModule, DxTextBoxModule, DxAutocompleteModule, DxDateBoxModule, ItensModule, DxPopupModule, DxSelectBoxModule,
    DxSelectBoxModule, DxLookupModule, FormsModule, DxValidationGroupModule ],
  exports: [ FormNotasComponent ],
  declarations: [ FormNotasComponent ],
})
export class FormNotaModule {}
