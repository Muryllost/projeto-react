export interface Operador {
  id_operador?: number;
  nome: string;
  status: "0" | "1";
}

export interface Movimento {
  id_movimento?: number;
  codigo: string;
  nome_produto: string;
  origem: string;
  destino: string;
  tipo: "ENTRADA" | "SAIDA";
  quantidade: number;
  operador: string;
  data_movimento: string;
  status: "0" | "1";
}
