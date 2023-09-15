import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { ListClienteModule } from 'src/app/shared/components/cliente/list-cliente/list-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

}





@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule, ListClienteModule ],
  exports: [ ClienteComponent ],
  declarations: [ ClienteComponent ]
})
export class ClienteModule {}
