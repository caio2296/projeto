/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiBaseUrl= environment["apiUrl"];
  // private cache$?: Observable<Sgl[]>;

  constructor(private http:HttpClient) { }

  private listar(){
    this.chamarApi();
    // if(!this.cache$){
    //   this.cache$ = this.ChamarApi().pipe(
    //     shareReplay(1)
    //   )
    // }
  }
  chamarApi():string{

    this.http.get(`${this.apiBaseUrl}/estado`).subscribe({
  next: (res) => console.log("Resposta da API:", res),
  error: (err) => console.error("Erro ao chamar API:", err)
});

console.log("Chamando api!");
   return "Chamando api!"; 
    // return this.http.get<Sgl[]>(`${this.apiBaseUrl}/Sgl`);
  }

}
