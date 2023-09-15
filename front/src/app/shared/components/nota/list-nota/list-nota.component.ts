import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { Nota } from 'src/app/shared/interfaces/nota';
import { NotaService } from 'src/app/shared/services/nota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-nota',
  templateUrl: './list-nota.component.html',
  styleUrls: ['./list-nota.component.scss']
})
export class ListNotaComponent implements OnInit {

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
  exports: [ ListNotaComponent ],
  declarations: [ ListNotaComponent ]
})
export class ListNotaModule {}
