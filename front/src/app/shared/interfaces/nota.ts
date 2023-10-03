import { Cliente } from "./cliente";
import { Itens } from "./itens";

export interface Nota {
  id: number;
  cliente: Cliente;
  itens: Itens[];
  numero: number;
  data: Date;
  valor_total: number;
}
