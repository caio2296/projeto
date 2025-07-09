export interface Tabela{
    id:string,
    descricao:string
}

export const frutas = [
  { id: 1, descricao: 'banana', tamanho:'médio' },
  { id: 2, descricao: 'maçã', tamanho:'pequeno' },
  { id: 3, descricao: 'melancia', tamanho:'grande' }
];

export interface frutas{
    id:string,
    descricao:string,
    tamanho: string
}