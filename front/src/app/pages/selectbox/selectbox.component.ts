import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxSelectBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';
import { CidadeEstadoModule } from 'src/app/shared/components/cidade-estado/cidade-estado.component';
import { Cidade } from 'src/app/shared/interfaces/cidade';
import { Estado } from 'src/app/shared/interfaces/estado';



@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss']
})
export class SelectboxComponent {

  cidade?: Cidade;
  estado?: Estado;

  cidadesSelecionadas(value: Cidade) {
    this.cidade = value;
  }

  estadosSelecionados(value: Estado) {
    this.estado = value;
  }

}

@NgModule({
  imports: [  BrowserModule, DxSelectBoxModule, DxTextBoxModule, DxTemplateModule, CidadeEstadoModule ],
  exports: [ SelectboxComponent ],
  declarations: [ SelectboxComponent ]
})
export class SelectboxModule {}


