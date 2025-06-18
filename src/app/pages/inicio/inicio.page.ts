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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { PokemonListResults } from 'src/app/services/pokeapi/pokeapi.mode';

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
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
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

        this.pokemons = [...this.pokemons, ...res.results];

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
