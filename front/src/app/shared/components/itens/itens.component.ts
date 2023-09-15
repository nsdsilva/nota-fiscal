import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxFormModule, DxNumberBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
import { Itens } from '../../interfaces/itens';



@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss']
})
export class ItensComponent implements OnInit {

  dataSource: Itens[] = [];
  customersData: any;

  shippersData: any;



  constructor() {}


  ngOnInit(): void {

  }

}




@NgModule({
  imports: [  BrowserModule, DxTemplateModule, DxBulletModule, DxButtonModule, DxFormModule,  DxTextBoxModule, DxNumberBoxModule,
              DxDataGridModule ],
  exports: [ ItensComponent ],
  declarations: [ ItensComponent ]
})
export class ItensModule {}
