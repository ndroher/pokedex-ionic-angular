import { Injectable } from '@angular/core';
import { Observable, Subject, of, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  catchError,
  startWith,
} from 'rxjs/operators';
import { getId } from 'src/app/utils/getId.utils';
import { formatarNome } from 'src/app/utils/formatarNome.utils';
import { PokeAPIService } from '../pokeapi/pokeapi.service';
import { IPokemonLista } from 'src/app/components/lista/lista.component';

@Injectable({
  providedIn: 'root',
})
export class BuscaService {
  public isLoading = false;
  public pokemons: IPokemonLista[] = [];
  public valueNome = '';
  public valueTipo: string = 'default';
  private valueNomeSubject = new Subject<string>();
  private valueTipoSubject = new Subject<string | null>();
  public isActive = false;

  private readonly MAX_ID = '1025';

  constructor(private pokeApi: PokeAPIService) {
    this.setupBusca();
  }

  private setupBusca(): void {
    combineLatest([
      this.valueNomeSubject.pipe(startWith('')),
      this.valueTipoSubject.pipe(startWith(null)),
    ])
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        switchMap(([nome, tipo]) => {
          this.isActive = !!nome || !!tipo;
          if (!this.isActive) return of([]);

          this.isLoading = true;
          const source$ = tipo
            ? this.getPokemonsDoTipo(tipo)
            : this.getPokemons();

          return source$.pipe(
            map((pokemonList) =>
              nome
                ? pokemonList.filter((p) => p.name.includes(nome))
                : pokemonList
            )
          );
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

  public onSearch(nome: string): void {
    this.valueNome = nome.trim().toLowerCase();
    this.valueNomeSubject.next(this.valueNome);
  }

  public onFilter(tipo: string): void {
    this.valueTipo = tipo;
    this.valueTipoSubject.next(tipo);
  }

  public clear(): void {
    this.onSearch('');
  }

  private getPokemonsDoTipo(tipo: string): Observable<IPokemonLista[]> {
    return this.pokeApi.getPokemonsDoTipo(tipo).pipe(
      map((res) => this.formatPokemonLista(res.pokemon.map((p) => p.pokemon))),
      catchError(() => of([]))
    );
  }

  private getPokemons(): Observable<IPokemonLista[]> {
    return this.pokeApi.getPokemons('0', this.MAX_ID).pipe(
      map((res) => this.formatPokemonLista(res.results)),
      catchError(() => of([]))
    );
  }

  private formatPokemonLista(
    list: { name: string; url: string }[]
  ): IPokemonLista[] {
    return list
      .map((pokemon) => {
        return {
          id: getId(pokemon.url),
          name: formatarNome(pokemon.name),
        };
      })
      .filter((pokemon) => pokemon.id <= 9999);
  }
}
