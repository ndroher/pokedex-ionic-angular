import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
} from '@ionic/angular/standalone';
import {
  ListaComponent,
  IPokemonLista,
} from 'src/app/components/lista/lista.component';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    ListaComponent,
    CommonModule,
  ],
})
export class FavoritosPage {
  pokemons: IPokemonLista[] = [];

  constructor(private favoritosService: FavoritosService) {}

  async ionViewWillEnter() {
    this.pokemons = await this.favoritosService.getFavoritos();
  }
}
