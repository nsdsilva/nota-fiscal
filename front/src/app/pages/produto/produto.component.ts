import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { ListProdutoModule } from 'src/app/shared/components/produto/list-produto/list-produto/list-produto.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent {

}



@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule, ListProdutoModule ],
  exports: [ ProdutoComponent ],
  declarations: [ ProdutoComponent]
})
export class ProdutoModule {}
