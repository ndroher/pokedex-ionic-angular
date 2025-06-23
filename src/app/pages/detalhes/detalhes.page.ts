import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonSpinner,
  IonProgressBar,
  IonToast,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { IPokemon } from 'src/app/services/pokeapi/pokeapi.mode';
import { addIcons } from 'ionicons';
import { arrowBackOutline, heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonGrid,
    IonCol,
    IonRow,
    IonText,
    IonSpinner,
    IonProgressBar,
    IonToast,
    CommonModule,
  ],
})
export class DetalhesPage implements OnInit, OnDestroy {
  pokemon?: IPokemon;
  isFavorito = false;
  toastMessage = '';
  isToastOpen = false;

  private favoritosSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeAPIService,
    private favoritosService: FavoritosService,
    private location: Location
  ) {
    addIcons({ heart, heartOutline, arrowBackOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokeapiService.getPokemon(id).subscribe(async (res) => {
        this.pokemon = res;
        this.favoritosSub = this.favoritosService.favoritosIds$.subscribe(
          (ids) => {
            if (this.pokemon) {
              this.isFavorito = ids.includes(this.pokemon.id);
            }
          }
        );
      });
    }
  }

  ngOnDestroy() {
    this.favoritosSub?.unsubscribe();
  }

  async toggleFavorito() {
    if (!this.pokemon) return;

    this.isFavorito = await this.favoritosService.toggleFavorito(this.pokemon);

    this.toastMessage = this.isFavorito
      ? `${this.pokemon.name} adicionado aos favoritos!`
      : `${this.pokemon.name} removido dos favoritos 😢`;

    this.setOpenToast(true);
  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  voltar(): void {
    this.location.back();
  }
}
