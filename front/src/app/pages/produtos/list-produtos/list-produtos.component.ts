import {Component, NgModule, OnInit} from '@angular/core';
import {Produto} from "../../../shared/interfaces/produto";
import {ProdutoService} from "../../../shared/services/produto.service";
import {Router} from "@angular/router";
import notify from "devextreme/ui/notify";
import {BrowserModule} from "@angular/platform-browser";
import {DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule} from "devextreme-angular";

@Component({
  selector: 'app-list-produtos',
  templateUrl: './list-produtos.component.html',
  styleUrls: ['./list-produtos.component.scss']
})
export class ListProdutosComponent implements OnInit {

  dataSource: Produto[] = [];
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


  constructor(private service: ProdutoService,
              private router: Router) {}


  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.service.listarProdutos().subscribe(resposta => {
      this.dataSource = resposta;
    })
  }


  onRowClick(e: any) {
    this.linhaSelecionada = e.data.id;
    this.router.navigate(['/editar-produto', this.linhaSelecionada]);
  }


  validateRemove(e: any) {
    this.linhaSelecionada = e.data.id;

    this.service.deletarProdutos(this.linhaSelecionada).subscribe(resposta => {
      if(resposta) {
        this.showSucesso();
        this.listarProdutos();
      } else {
        this.showError();
      }
    })
  }

  novoProduto() {
    this.router.navigate(['/novo-produto']);
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
}



@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule ],
  exports: [ ListProdutosComponent ],
  declarations: [ ListProdutosComponent ]
})
export class ListProdutosModule {}
