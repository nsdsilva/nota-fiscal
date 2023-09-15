import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { ListNotaModule } from 'src/app/shared/components/nota/list-nota/list-nota.component';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent {

}




@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule, ListNotaModule ],
  exports: [ NotaComponent ],
  declarations: [ NotaComponent]
})
export class NotaModule {}
