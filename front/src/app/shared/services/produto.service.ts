import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'produto';


  constructor(private http: HttpClient) { }


  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }


  getById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }


  salvarProdutos(produto: Produto): Observable<Produto> {
    if (produto.id) {
      return this.http.put<Produto>(`${this.API}/${produto.id}`, produto);
    } else {
      return this.http.post<Produto>(this.API, produto);
    }
  }


  deletarProdutos(produto: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.API}/${produto}`);
  }
}
