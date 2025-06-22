import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonIcon,
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
import { getId } from 'src/app/utils/getId.utils';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { BuscaService } from 'src/app/services/busca/busca.service';
import { addIcons } from 'ionicons';
import { pricetag } from 'ionicons/icons';
import { PokemonTypes } from 'src/app/services/pokeapi/pokeapi.mode';

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
    IonSelect,
    IonSelectOption,
    IonIcon,
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
  tipos = PokemonTypes;

  constructor(
    private pokeapiService: PokeAPIService,
    public buscaService: BuscaService
  ) {
    addIcons({ pricetag });
  }

  ngOnInit(): void {
    this.loadPokemons();
  }

  onSearch(event: any) {
    this.buscaService.onSearch(event.detail.value);
  }

  onFilter(event: any) {
    this.buscaService.onFilter(event.detail.value);
  }

  loadPokemons(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;

    this.pokeapiService
      .getPokemons(this.offset.toString(), this.limit.toString())
      .subscribe((res) => {
        this.isLoading = false;

        const newPokemons: IPokemonLista[] = res.results.map((pokemon) => ({
          id: getId(pokemon.url),
          name: pokemon.name,
        }));

        this.pokemons = [...this.pokemons, ...newPokemons];

        this.offset += this.limit;

        if (event) {
          event.target.complete();

          if (res.next === null) event.target.disabled = true;
        }
      });
  }
}
