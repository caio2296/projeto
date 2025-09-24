export interface Usuarios {
  id: number;
  email: string;
  tokenJWT: string;
  UsuarioTipo: string; // padrão "comum" pode ser definido na hora de usar
}