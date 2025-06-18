import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
} from '@ionic/angular/standalone';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { IPokemon } from 'src/app/services/pokeapi/pokeapi.mode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    CommonModule,
    RouterLink,
  ],
})
export class FavoritosPage {
  pokemons: IPokemon[] = [];

  constructor(private favoritosService: FavoritosService) {}

  async ionViewWillEnter() {
    this.pokemons = await this.favoritosService.getFavoritos();
  }
}
