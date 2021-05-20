import { LancamentoStatus } from "./lancamentoStatus";

export interface ILancamento {
  id?: number;
  tipo: LancamentoStatus;
  pessoaId: number;
  categoriaId: number;
  descricao: string;
  dataPagamento: Date;
  dataVencimento: Date;
  valor: number;
  observacoes: string;
}
