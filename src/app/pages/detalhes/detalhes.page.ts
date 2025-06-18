import { Component, OnInit } from '@angular/core';
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
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { IPokemon } from 'src/app/services/pokeapi/pokeapi.mode';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  arrowBackSharp,
  heart,
  heartOutline,
} from 'ionicons/icons';

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
export class DetalhesPage implements OnInit {
  pokemon?: IPokemon;
  isFavorito = false;
  toastMessage = '';

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
        this.isFavorito = await this.favoritosService.isFavorito(
          this.pokemon.id
        );
      });
    }
  }

  async toggleFavorito() {
    if (!this.pokemon) return;

    if (this.isFavorito) {
      await this.favoritosService.removeFavorito(this.pokemon.id);
      this.toastMessage = `${this.pokemon.name} removido dos favoritos.`;
    } else {
      await this.favoritosService.setFavorito(this.pokemon);
      this.toastMessage = `${this.pokemon.name} adicionado aos favoritos!`;
    }

    this.isFavorito = !this.isFavorito;
  }

  voltar(): void {
    this.location.back();
  }
}
