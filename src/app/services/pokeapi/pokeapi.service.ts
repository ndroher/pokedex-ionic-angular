import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://pokeapi.co/api/v2';

  getPokemons(offset: string = '0', limit: string = '20'): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
    );
  }

  getPokemon(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${id}`);
  }
}
