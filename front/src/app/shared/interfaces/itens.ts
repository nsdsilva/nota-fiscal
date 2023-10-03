import { Nota } from "./nota";
import { Produto } from "./produto";

export interface Itens {
  id?: number;
  produto: Produto;
  nota: Nota;
  ordenacao: number;
  quantidade: number;
  valor_total: number;
}
