import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPokemonList } from './pokeapi.mode';
import { IPokemon } from './pokeapi.mode';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://pokeapi.co/api/v2';

  getPokemons(
    offset: string = '0',
    limit: string = '20'
  ): Observable<IPokemonList> {
    return this.http.get<IPokemonList>(
      `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
    );
  }

  getPokemon(id: string): Observable<IPokemon> {
    return this.http.get<IPokemon>(`${this.baseUrl}/pokemon/${id}`);
  }
}
