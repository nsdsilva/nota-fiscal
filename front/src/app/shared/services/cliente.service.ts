import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'cliente';



  constructor(private http: HttpClient) { }



  listaClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }


  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/${id}`);
  }


  salvarClientes(cliente: Cliente): Observable<Cliente> {
    if (cliente.id) {
      return this.http.put<Cliente>(`${this.API}/${cliente.id}`, cliente);
    } else {
      return this.http.post<Cliente>(this.API, cliente);
    }
  }


  deletarCliente(cliente: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.API}/${cliente}`);
  }

  getByNome(cliente: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.API}/buscar-por-nome?nome=${cliente}`)
  }
}
