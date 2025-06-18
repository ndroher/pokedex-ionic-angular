import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonText,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

export interface IPokemonLista {
  id: number;
  name: string;
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonText,
    CommonModule,
    RouterLink,
  ],
})
export class ListaComponent {
  @Input() pokemons: IPokemonLista[] = [];

  constructor() {}
}
