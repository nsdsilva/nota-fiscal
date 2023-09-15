import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../interfaces/estado';
import { Cidade } from '../interfaces/cidade';

@Injectable({
  providedIn: 'root'
})
export class EstadoCidadeService {


  constructor(private http: HttpClient) { }



  listarEstado(): Observable<Estado[]> {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    return this.http.get<Estado[]>(url);
  }

  listarCidade(siglaEstado: string): Observable<Cidade[]> {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`;
    console.log('peguei a url', url);
    return this.http.get<Cidade[]>(url);
  }
}
