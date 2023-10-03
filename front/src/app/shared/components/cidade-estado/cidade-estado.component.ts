import { NgModule, Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Estado } from '../../interfaces/estado';
import { Cidade } from '../../interfaces/cidade';
import { EstadoCidadeService } from '../../services/estado-cidade.service';
import { BrowserModule } from '@angular/platform-browser';
import { DxSelectBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-cidade-estado',
  templateUrl: './cidade-estado.component.html',
  styleUrls: ['./cidade-estado.component.scss']
})
export class CidadeEstadoComponent implements OnInit {

  @Input() estadoPadrao: string = '';
  @Output() eventoCidade = new EventEmitter<Cidade>();
  @Output() eventoEstado = new EventEmitter<Estado>();


  estados: Estado[] = [];
  cidades: Cidade[] = [];
  estadoSelecionado: any;



  constructor(private service: EstadoCidadeService) {}


  ngOnInit(): void {
    this.listaEstados();
  }



  listaEstados() {
    this.service.listarEstado().subscribe((estados: Estado[]) => {

      for (const e of estados) {
        const est = new Estado(e);
        this.estados.push(est);
        est.getEstado();

      }

      if (this.estadoPadrao) {
        this.ListaCidade(this.estadoPadrao);
      }
    });
  }



  ListaCidade(siglaEstado: string): void { //listando as cidades quando é alterado o estado selecionado do seu valor padrão
    this.estadoSelecionado = siglaEstado;
    this.eventoEstado.emit(this.estadoSelecionado);

    if (this.estadoSelecionado) {
      this.service.listarCidade(this.estadoSelecionado).subscribe((cidades) => {
        this.cidades = cidades;
      });
    } else {
      this.cidades = [];
    }
  }


  selecionarCidade(value: Cidade) {
    this.eventoCidade.emit(value);
  }
}



  @NgModule({
    imports: [  BrowserModule, DxSelectBoxModule, DxTextBoxModule, DxTemplateModule ],
    exports: [ CidadeEstadoComponent ],
    declarations: [ CidadeEstadoComponent ]
  })
  export class CidadeEstadoModule {}

