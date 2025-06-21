import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonSearchbar,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import {
  ListaComponent,
  IPokemonLista,
} from 'src/app/components/lista/lista.component';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { BuscaService } from 'src/app/services/busca/busca.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ListaComponent,
    IonSpinner,
    IonSearchbar,
    IonText,
    IonGrid,
    IonCol,
    IonRow,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
  ],
})
export class InicioPage implements OnInit {
  pokemons: IPokemonLista[] = [];
  offset = 0;
  limit = 20;
  isLoading = false;

  constructor(
    private pokeapiService: PokeAPIService,
    public buscaService: BuscaService
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  onSearch(event: any) {
    this.buscaService.onSearch(event.detail.value);
  }

  private getId(url: string): number {
    const urlParts = url.split('/').filter(Boolean);
    return parseInt(urlParts[urlParts.length - 1]);
  }

  async loadPokemons(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    this.pokeapiService
      .getPokemons(this.offset.toString(), this.limit.toString())
      .subscribe((res) => {
        if (!event) {
          this.isLoading = false;
        }

        let newPokemons: IPokemonLista[] = res.results.map((pokemon) => {
          const id = this.getId(pokemon.url);
          return {
            id,
            name: pokemon.name,
          };
        });

        newPokemons = newPokemons.filter((pokemon) => pokemon.id <= 9999);

        this.pokemons = [...this.pokemons, ...newPokemons];

        this.offset += this.limit;

        if (event) {
          event.target.complete();

          if (res.next === null) {
            event.target.disabled = true;
          }
        }
      });
  }

  loadMore(event: any) {
    this.loadPokemons(event);
  }
}
