import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { PokemonListResults } from 'src/app/services/pokeapi/pokeapi.mode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
    RouterLink,
  ],
})
export class InicioPage implements OnInit {
  pokemons: PokemonListResults[] = [];
  offset = 0;
  limit = 20;

  constructor(
    private pokeapiService: PokeAPIService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  private getId(url: string): number {
    const urlParts = url.split('/').filter(Boolean);
    return +urlParts[urlParts.length - 1];
  }

  async loadPokemons(event?: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      spinner: 'circles',
    });
    if (!event) {
      await loading.present();
    }

    this.pokeapiService
      .getPokemons(this.offset.toString(), this.limit.toString())
      .subscribe((res) => {
        if (!event) {
          loading.dismiss();
        }

        let newPokemons = res.results.map((pokemon) => {
          const id = this.getId(pokemon.url);
          return {
            ...pokemon,
            id,
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
