/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { frutas } from '../shared/Models/type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiBaseUrl= environment["apiUrl"];
  // private cache$?: Observable<Sgl[]>;

  constructor(private http:HttpClient) { }

  private listar(){
    // this.chamarApi();
    // if(!this.cache$){
    //   this.cache$ = this.ChamarApi().pipe(
    //     shareReplay(1)
    //   )
    // }
  }
//   chamarApi():string{

//     this.http.get(`${this.apiBaseUrl}/estado`).subscribe({
//   next: (res) => console.log("Resposta da API:", res),
//   error: (err) => console.error("Erro ao chamar API:", err)
// });

// console.log("Chamando api!");
//    return "Chamando api!"; 
//     // return this.http.get<Sgl[]>(`${this.apiBaseUrl}/Sgl`);
//   }

  listarFrutas(): Observable<frutas[]> {
  return this.http.get<frutas[]>(`${this.apiBaseUrl}api/ListarFrutas`);
  } 

  adicionarFruta(novaFruta: frutas): Observable<any> {
  return this.http.post(`${this.apiBaseUrl}api/AdicionarFrutas`, novaFruta);
}

deletarFruta(fruta: frutas): Observable<any> {
  return this.http.request('Delete', `${this.apiBaseUrl}api/ExcluirFruta`, {
    body: fruta
  });
}

atualizarFruta(fruta: frutas): Observable<any> {
  return this.http.put(`${this.apiBaseUrl}api/AtualizarFruta`, fruta);
}

}
