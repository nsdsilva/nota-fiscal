import {Component, NgModule, OnInit} from '@angular/core';
import {Nota} from "../../../shared/interfaces/nota";
import {NotaService} from "../../../shared/services/nota.service";
import {Router} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule} from "devextreme-angular";

@Component({
  selector: 'app-list-notas',
  templateUrl: './list-notas.component.html',
  styleUrls: ['./list-notas.component.scss']
})
export class ListNotasComponent implements OnInit{

  dataSource: Nota[] = [];
  linhaSelecionada: any;


  constructor(private service: NotaService,
              private router: Router) {}

  ngOnInit(): void {
    this.listarNotas();
  }


  listarNotas() {
    this.service.listarNotas().subscribe(resposta => {
      this.dataSource = resposta;
    });
  }

  onRowClick(e: any) {
    this.linhaSelecionada = e.data.id;
    this.router.navigate(['/editar-nota', this.linhaSelecionada]);
  }

  novaNota() {
    this.router.navigate(['/nova-nota']);
  }

  validateRemove(e: any) {}
}


@NgModule({
  imports: [  BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule ],
  exports: [ ListNotasComponent ],
  declarations: [ ListNotasComponent ]
})
export class ListNotaModule {}
