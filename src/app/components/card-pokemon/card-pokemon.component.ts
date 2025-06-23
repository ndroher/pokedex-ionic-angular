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

  private favoritosSubscription: Subscription | undefined;

  constructor(
    private favoritosService: FavoritosService,
    private pokeapiService: PokeAPIService
  ) {
    addIcons({ heart, heartOutline });
  }

  async ngOnInit() {
    if (!this.pokemon) return;
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
          ? `${pokemon.name} adicionado aos favoritos!`
          : `${pokemon.name} removido dos favoritos 😢`;
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
}
