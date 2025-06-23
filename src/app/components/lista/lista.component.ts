import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CardPokemonComponent } from 'src/app/components/card-pokemon/card-pokemon.component';

export interface IPokemonLista {
  id: number;
  name: string;
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  imports: [IonGrid, IonRow, IonCol, CardPokemonComponent, CommonModule],
})
export class ListaComponent {
  @Input() pokemons: IPokemonLista[] = [];
  @Input() toastAnchorId: string | undefined;

  constructor() {}
}
