import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  catchError,
} from 'rxjs/operators';
import { PokeAPIService } from '../pokeapi/pokeapi.service';
import { IPokemonList, PokemonListResults } from '../pokeapi/pokeapi.mode';
import { IPokemonLista } from 'src/app/components/lista/lista.component';

const MAX_ID = '1025';

@Injectable({
  providedIn: 'root',
})
export class BuscaService {
  public value = '';
  public isLoading = false;
  public pokemons: IPokemonLista[] = [];
  private subject = new Subject<string>();

  constructor(private pokeApi: PokeAPIService) {
    this.debounce();
  }

  public onSearch(value: string): void {
    this.value = value.trim().toLowerCase();

    this.isLoading = !!this.value;
    if (!this.value) this.pokemons = [];

    this.subject.next(this.value);
  }

  private debounce(): void {
    this.subject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),

        switchMap((value) => {
          if (!value) return of([]);

          return this.buscar(value);
        }),

        catchError((error) => {
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe((pokemonsFiltrados) => {
        this.pokemons = pokemonsFiltrados;
        this.isLoading = false;
      });
  }

  private buscar(value: string): Observable<IPokemonLista[]> {
    return this.pokeApi.getPokemons('0', MAX_ID).pipe(
      map((pokemonList: IPokemonList): IPokemonLista[] => {
        return pokemonList.results
          .filter((pokemon: PokemonListResults) =>
            pokemon.name.toLowerCase().includes(value)
          )
          .map((pokemon: PokemonListResults): IPokemonLista => {
            const urlParts = pokemon.url.split('/').filter(Boolean);
            const id = parseInt(urlParts[urlParts.length - 1]);
            return { id: id, name: pokemon.name };
          })
          .slice(0, 20);
      })
    );
  }

  public clear(): void {
    this.value = '';
    this.pokemons = [];
    this.isLoading = false;
  }
}
