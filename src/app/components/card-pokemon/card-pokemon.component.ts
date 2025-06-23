import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonButton,
  IonIcon,
  IonLabel,
  IonToast,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPokemon } from 'src/app/services/pokeapi/pokeapi.mode';
import { IPokemonLista } from 'src/app/components/lista/lista.component';
import { CORES_TIPO } from 'src/app/utils/cores.utils';
import { formatarNome, titleCase } from 'src/app/utils/formatarNome.utils';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss'],
  imports: [
    IonCard,
    IonButton,
    IonIcon,
    IonLabel,
    IonToast,
    RouterLink,
    CommonModule,
  ],
})
export class CardPokemonComponent implements OnInit, OnDestroy {
  @Input() pokemon!: IPokemonLista;
  @Input() toastAnchorId: string | undefined;
  @Output() onFavoritoToggled = new EventEmitter<string>();

  isFavorito = false;
  imageUrl = '';
  toastMessage = '';
  isToastOpen = false;
  pokemonInfo: IPokemon | null = null;

  private favoritosSubscription: Subscription | undefined;

  constructor(
    private favoritosService: FavoritosService,
    private pokeapiService: PokeAPIService
  ) {
    addIcons({ heart, heartOutline });
  }

  async ngOnInit() {
    if (!this.pokemon) return;
    this.pokeapiService
      .getPokemon(this.pokemon.id.toString())
      .subscribe((info) => {
        this.pokemonInfo = info;
      });
    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.pokemon.id}.png`;
    this.favoritosSubscription = this.favoritosService.favoritosIds$.subscribe(
      (ids) => {
        this.isFavorito = ids.includes(this.pokemon.id);
      }
    );
  }

  ngOnDestroy() {
    this.favoritosSubscription?.unsubscribe();
  }

  async toggleFavorito(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.pokeapiService.getPokemon(this.pokemon.id.toString()).subscribe({
      next: async (pokemon: IPokemon) => {
        await this.favoritosService.toggleFavorito(pokemon);

        this.toastMessage = this.isFavorito
          ? `${titleCase(
              formatarNome(this.pokemon.name)
            )} adicionado aos favoritos!`
          : `${titleCase(
              formatarNome(this.pokemon.name)
            )} removido dos favoritos 😢`;
      },
      error: (error) => {
        this.toastMessage = `Erro ao adicionar aos favoritos`;
      },
    });
    this.setOpenToast(true);
  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  getCardStyle(): { [key: string]: string } {
    let colorSet1 = CORES_TIPO['default'];
    let colorSet2 = CORES_TIPO['default'];

    if (this.pokemonInfo) {
      const tipos = this.pokemonInfo.types.map((t) => t.type.name);

      colorSet1 = CORES_TIPO[tipos[0]] || CORES_TIPO['default'];

      colorSet2 = tipos[1]
        ? CORES_TIPO[tipos[1]] || CORES_TIPO['default']
        : colorSet1;
    }

    return {
      '--card-color-1': colorSet1.primary,
      '--card-color-2': colorSet2.primary,
    };
  }
}
