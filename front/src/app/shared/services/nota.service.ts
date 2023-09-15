import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private readonly API = 'nota';


  constructor(private http: HttpClient) { }


  listarNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.API);
  }


  getById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.API}/${id}`);
  }


  salvarNota(nota: Nota): Observable<Nota> {
    if (nota.id) {
      return this.http.put<Nota>(`${this.API}/${nota.id}`, nota);
    } else {
      return this.http.post<Nota>(this.API, nota);
    }
  }
}
