import { UsuarioStatus } from "./usuarioStatus";

export interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  permissao?: UsuarioStatus;
}
