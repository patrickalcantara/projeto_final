export interface IPessoa {
  id?: number;
  nome: string;
  email?: string;
  ativo?: boolean;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
}
